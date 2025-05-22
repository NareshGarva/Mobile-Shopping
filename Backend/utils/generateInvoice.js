const PDFDocument = require('pdfkit');

function generateInvoice(doc, order) {
  const primaryColor = '#001F55';
  const accentColor = '#FED700';

  // Header
  doc.fillColor(primaryColor).fontSize(22).text('Mobile Shopping', { align: 'left' });
  doc.moveDown(0.5).fontSize(10).fillColor('gray').text('Invoice', { align: 'right' });
  doc.moveDown(1);

  // Order Info
  doc.fillColor(primaryColor).fontSize(12).text(`Order ID: ${order.orderId}`, { continued: true })
    .fillColor('black').text(`   |   Order Date: ${new Date(order.orderDate).toLocaleDateString()}`, { continued: true })
    .text(`   |   Status: ${order.shippingStatus}`, { align: 'right' });
  doc.moveDown(1);

  // Billing Address
  const startY = doc.y;
  const billing = order.billingAddress || {};
  const shipping = order.shippingAddress || {};

  doc.fillColor(accentColor).fontSize(12).text('Billing Address:', 50, startY);
  doc.fillColor('black').fontSize(10)
    .text(billing.fullName || '', 50)
    .text(billing.addressLine1 || '')
    .text(`${billing.localityArea || ''}, ${billing.cityTown || ''}`)
    .text(`${billing.state || ''} - ${billing.pinCode || ''}`)
    .text(billing.country || '')
    .text('Mobile: ' + (billing.mobileNumber || 'N/A'));

  // Shipping Address
  doc.fillColor(accentColor).fontSize(12).text('Shipping Address:', 320, startY);
  doc.fillColor('black').fontSize(10)
    .text(shipping.fullName || '', 320, startY + 15)
    .text(shipping.addressLine1 || '')
    .text(`${shipping.localityArea || ''}, ${shipping.cityTown || ''}`)
    .text(`${shipping.state || ''} - ${shipping.pinCode || ''}`)
    .text(shipping.country || '')
    .text('Mobile: ' + (shipping.mobileNumber || 'N/A'));

  doc.moveDown(3);

  // Table Headers
  const tableTop = doc.y;
  doc.fontSize(11).fillColor(accentColor)
    .text('Item', 50, tableTop)
    .text('Color', 280, tableTop)
    .text('Qty', 350, tableTop, { width: 50, align: 'center' })
    .text('Price', 410, tableTop, { width: 70, align: 'right' })
    .text('Total', 480, tableTop, { width: 70, align: 'right' });

  doc.moveDown(0.5).strokeColor(accentColor).moveTo(50, doc.y).lineTo(550, doc.y).stroke();

  // Order Items
  let totalAmount = 0;
  (order.OrderItems || []).forEach(item => {
    const variant = item.OrderItemsVarient || {};
    const itemTotal = item.itemPrice * item.itemQty;
    totalAmount += itemTotal;

    const y = doc.y + 10;

    if (item.minImage) {
      try {
        doc.image(item.minImage, 50, y - 5, { width: 50, height: 50, fit: [50, 50] });
      } catch {}
    }

    doc.fontSize(10).fillColor(primaryColor)
      .text(item.itemTitle || 'Untitled', 110, y, { width: 80 });

    doc.rect(280, y + 15, 20, 20).fill(item.itemColor || '#ccc').stroke();

    doc.fillColor('black')
      .text(item.itemQty.toString(), 350, y + 15, { width: 50, align: 'center' })
      .text(`₹${item.itemPrice.toFixed(2)}`, 410, y + 15, { width: 70, align: 'right' })
      .text(`₹${itemTotal.toFixed(2)}`, 480, y + 15, { width: 70, align: 'right' });

    doc.moveDown(4);
  });

  doc.strokeColor(accentColor).moveTo(350, doc.y).lineTo(550, doc.y).stroke();

  // Grand Total
  doc.fontSize(12).fillColor(primaryColor).text('Grand Total:', 350, doc.y + 5, { width: 100, align: 'right' })
    .fillColor('black').text(`₹${totalAmount.toFixed(2)}`, 480, doc.y + 5, { width: 70, align: 'right' });
  doc.moveDown(2);

  // Payment Details
  doc.fontSize(11).fillColor(accentColor).text('Payment Method:', 50)
    .fillColor('black').text(order.paymentMethod || 'N/A', 170, doc.y - 13);

  doc.fillColor(accentColor).text('Payment Status:', 320)
    .fillColor('black').text(order.paymentStatus || 'N/A', 430, doc.y - 13);
  doc.moveDown(2);

  // Footer
  doc.fontSize(10).fillColor('gray')
    .text('Thank you for shopping with Mobile Shopping!', { align: 'center' })
    .moveDown(0.5)
    .text('For any queries, contact support@mobikart.com', { align: 'center' });
}

module.exports = generateInvoice;
