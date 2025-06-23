const { Op } = require('sequelize');
const { User, Order} = require('../models/initAssociations');

exports.sendDashData = async (req, res) => {
  const { type } = req.params;

  if (!type) {
    return res.status(400).json({ Message: "Filter type is required" });
  }

  console.log(type);

  let startDate = new Date();
  let endDate = new Date();

  switch (type) {
    case 'Today':
      startDate.setHours(0, 0, 0, 0);
      break;

    case 'Last 3 days':
      startDate.setDate(startDate.getDate() - 2);
      startDate.setHours(0, 0, 0, 0);
      break;

    case 'last week':
      startDate.setDate(startDate.getDate() - 6);
      startDate.setHours(0, 0, 0, 0);
      break;

    case 'last Month':
      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setHours(0, 0, 0, 0);
      break;

    default:
      return res.status(400).json({ Message: "Invalid filter type" });
  }

  console.log(startDate,endDate);

  try {
    const orders = await Order.findAll({
      where: {
        orderDate: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const totalRevenue = orders.reduce((sum, order) => sum + order.orderAmount, 0);
    const totalOrders = orders.length;
    const activeCustomers = new Set(orders.map(order => order.userId)).size;
    const conversionRate = (totalOrders / (activeCustomers || 1)) * 100;

    // Create chart data grouped by date
    const dailyData = {};
    orders.forEach(order => {
      const date = order.orderDate.toISOString().slice(0, 10);
      dailyData[date] = (dailyData[date] || 0) + 1;
    });

    const chartLabels = Object.keys(dailyData);
    const chartData = Object.values(dailyData);

    res.status(200).json({
      revenue: totalRevenue.toFixed(2),
      orders: totalOrders,
      customers: activeCustomers,
      rate: Number(conversionRate.toFixed(2)),
      chartLabels,
      chartData,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Internal server error" });
  }
};




exports.sendCousDashData = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ Message: "Start and end date required" });
  }

  try {
    const orders = await Order.findAll({
      where: {
        orderDate: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
    });

    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = orders.length;
    const activeCustomers = new Set(orders.map(order => order.userId)).size;
    const conversionRate = (totalOrders / (activeCustomers || 1)) * 100;

    // Chart data
    const dailyData = {};
    orders.forEach(order => {
      const date = order.orderDate.toISOString().slice(0, 10);
      dailyData[date] = (dailyData[date] || 0) + 1;
    });

    const chartLabels = Object.keys(dailyData);
    const chartData = Object.values(dailyData);

    res.status(200).json({
      revenue: totalRevenue,
      orders: totalOrders,
      customers: activeCustomers,
      rate: Number(conversionRate.toFixed(2)),
      chartLabels,
      chartData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Internal server error" });
  }
};
