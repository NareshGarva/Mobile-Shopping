const PDFDocument = require('pdfkit');
const generateInvoice = require('../utils/generateInvoice');
const {
  Order,
  OrderItems,
  OrderItemsVarient,
  OrderTimeline,
  shippingAddress,
  billingAddress
} = require("../models/initAssociations");

exports.getInvoice = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findByPk(orderId, {
      include: [
        { model: OrderItems, include: [OrderItemsVarient] },
        { model: OrderTimeline },
        { model: shippingAddress },
        { model: billingAddress }
      ]
    });

    if (!order) {
      return res.status(404).send('Order not found');
    }

    if (order.orderStatus !== 'Complete') {
      return res.status(403).send('Invoice available only for completed orders');
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice_${orderId}.pdf`);

    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    doc.pipe(res);

    generateInvoice(doc, order);

    doc.end();
  } catch (err) {
    console.error('Error generating invoice:', err);
    res.status(500).send('Internal Server Error');
  }
};
