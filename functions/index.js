const functions = require('firebase-functions');
const admin = require('firebase-admin');
const mercadopago = require('mercadopago');

admin.initializeApp();
const db = admin.firestore();

// Token de producción de Mercado Pago
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN || 'TU_ACCESS_TOKEN_AQUI'
});

exports.crearOrdenPago = functions.https.onCall(async (data, context) => {
  try {
    const pagoRef = db.collection('pagos_temporales').doc();
    await pagoRef.set({
      status: 'pendiente',
      creadoEn: admin.firestore.FieldValue.serverTimestamp()
    });

    const preference = {
      items: [
        {
          title: 'Descarga Formato: Solicitud de Empleo',
          unit_price: 5.00,
          quantity: 1,
        }
      ],
      external_reference: pagoRef.id,
      notification_url: "https://tu-region-tu-proyecto.cloudfunctions.net/webhookMercadoPago"
    };

    const response = await mercadopago.preferences.create(preference);
    
    return { 
      idPagoFirebase: pagoRef.id, 
      initPoint: response.body.init_point 
    };
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Error al crear pago');
  }
});

exports.webhookMercadoPago = functions.https.onRequest(async (req, res) => {
  const { query } = req;
  if (query.type === 'payment') {
    const paymentId = query['data.id'];
    try {
      const paymentInfo = await mercadopago.payment.findById(paymentId);
      const data = paymentInfo.body;
      
      // Valida que el pago sea exitoso y que no paguen menos de $5
      if (data.status === 'approved' && data.transaction_amount >= 5.00) {
        const docId = data.external_reference;
        await db.collection('pagos_temporales').doc(docId).update({
          status: 'pagado',
          pagadoEn: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    } catch (error) {
      console.error("Error validando webhook", error);
    }
  }
  res.status(200).send("OK");
});