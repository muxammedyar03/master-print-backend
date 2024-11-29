const { json } = require('express');
const OrderModel = require('../models/OrderModel');
const Order = require('../models/OrderModel');
const FileService = require('../Service/FileService');

class OrderService {
  async create(data, files) {
    try {
      const frontLogo = files[1] ? FileService.saveFile(files[1]) : null;
      const backLogo = files['back.logo.file'] ? FileService.saveFile(files['back.logo.file'][0]) : null;
      const clothingImage = files[0] ? FileService.saveFile(files[0]) : null;

      const order = new Order({
        ...data,
        clothing: {
          ...data.clothing,
          image: clothingImage
        },
        front: {
          ...data.front,
          logo: { 
            ...data.front.logo,
            file: frontLogo 
          },

        },
        back: {
          ...data.back,
          logo: { ...data.back?.logo, file: backLogo },
        },
      });

      return await order.save();
    } catch (error) {
      throw new Error('Error creating order in Service: ' + error.message);
    }
  }
  async getAll() {
    try {
      return await Order.find();
    } catch (error) {
      throw new Error('Error fetching orders in Service:'+ error.message);
    }
  }
  async getOne(id) {
    try {
      const order = await Order.findById(id).populate('customerId').populate('clothing.itemId');
      if (!order) throw new Error('Order not found');
      return order;
    } catch (error) {
      throw new Error('Error fetching order: ' + error.message);
    }
  }

  async getMany(filter = {}) {
    try {
      return await Order.find(filter).populate('customerId').populate('clothing.itemId');
    } catch (error) {
      throw new Error('Error fetching orders: ' + error.message);
    }
  }

  async update(id, data, files) {
    try {
      const order = await Order.findById(id);
      if (!order) throw new Error('Order not found');

      // Oldingi logolarni o'chirish va yangilarini saqlash
      const frontLogo = files.frontLogo ? FileService.saveFile(files.frontLogo) : order.front.logo.file;
      if (files.frontLogo && order.front.logo.file) FileService.deleteFile(order.front.logo.file);

      const backLogo = files.backLogo ? FileService.saveFile(files.backLogo) : order.back.logo.file;
      if (files.backLogo && order.back.logo.file) FileService.deleteFile(order.back.logo.file);

      return await Order.findByIdAndUpdate(
        id,
        {
          ...data,
          front: { ...data.front, logo: { ...data.front.logo, file: frontLogo } },
          back: { ...data.back, logo: { ...data.back.logo, file: backLogo } },
        },
        { new: true }
      );
    } catch (error) {
      throw new Error('Error updating order: ' + error.message);
    }
  }

  async delete(id) {
    try {
      const order = await Order.findById(id);
      if (!order) throw new Error('Order not found');

      // Logolarni o'chirish
      if (order.front.logo.file) FileService.deleteFile(order.front.logo.file);
      if (order.back.logo.file) FileService.deleteFile(order.back.logo.file);

      return await Order.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting order: ' + error.message);
    }
  }
  async deleteAll() {
    try {
      const orders = await OrderModel.find();
      orders.forEach((order) => {
        if (order.clothing.image) FileService.deleteFile(order.clothing.image);
        if (order.front?.logo?.file) FileService.deleteFile(order.front.logo.file);
        if (order.back?.logo?.file) FileService.deleteFile(order.back.logo.file);
      })
      if(orders.length == 0 ){
        throw new Error('No orders found to delete');
      }
      return await OrderModel.deleteMany({});
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
}

module.exports = new OrderService();
