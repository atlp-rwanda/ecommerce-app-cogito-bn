import { product } from '../../database/models';

export async function changeProductAvailability(req, res) {
  try {
    const { productId, vendorId } = req.body;
    if (!productId || !vendorId) {
      return res.status(400).json({
        status: 400,
        message: req.t('provide_details_product_availability'),
      });
    }
    const Product = await product.findOne({
      where: {
        id: productId,
        vendor_id: vendorId,
      },
    });

    if (!Product) {
      return res.status(404).json({
        status: 404,
        message: req.t('product_not_found'),
      });
    }
    console.log(Product.dataValues.stock);
    let updatedProduct;
    if (Product.dataValues.stock === 'In Stock') {
      updatedProduct = await product.update(
        {
          stock: 'Out of Stock',
        },
        {
          where: {
            id: productId,
            vendor_id: vendorId,
          },
          returning: true,
        },
      );
      return res.status(200).json({
        status: 200,
        message: req.t('product_availability_updated'),
        data: updatedProduct,
      });
    }

    updatedProduct = await product.update(
      {
        stock: 'In Stock',
      },
      {
        where: {
          id: productId,
          vendor_id: vendorId,
        },
        returning: true,
      },
    );
    return res.status(200).json({
      status: 200,
      message: req.t('product_availability_updated'),
      data: updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: req.t('server_error'),
      Error: err.message,
    });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      status: 400,
      message: req.t('provide_product_id'),
    });
  }
  const Product = await product.findOne({
    where: { id },
  });

  if (!Product) {
    return res.status(404).json({
      status: 404,
      message: req.t('product_not_found'),
    });
  }

  try {
    await Product.destroy();

    return res.status(200).json({
      status: 200,
      message: req.t('product_deleted'),
      data: Product,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: req.t('server_error'),
      Error: err.message,
    });
  }
}

export async function getAvailableProducts(req, res) {
  const { vendorId } = req.body;
  if (!vendorId) {
    return res.status(400).json({
      status: 400,
      message: req.t('provide_vendor_id'),
    });
  }
  const Product = await product.findAll({
    where: { vendor_id: vendorId, stock: 'In Stock' },
  });

  if (!Product) {
    return res.status(404).json({
      status: 404,
      message: req.t('no_available_products'),
    });
  }

  try {
    return res.status(200).json({
      status: 200,
      message: req.t('all_available_products'),
      data: Product,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: req.t('server_error'),
      Error: err.message,
    });
  }
}

export async function getUnavailableProducts(req, res) {
  const { vendorId } = req.body;
  if (!vendorId) {
    return res.status(400).json({
      status: 400,
      message: req.t('provide_vendor_id'),
    });
  }
  const Product = await product.findAll({
    where: { vendor_id: vendorId, stock: 'Out of Stock' },
  });

  if (!Product) {
    return res.status(404).json({
      status: 404,
      message: req.t('no_unavailable_products'),
    });
  }

  try {
    return res.status(200).json({
      status: 200,
      message: req.t('all_unavailable_products'),
      data: Product,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: req.t('server_error'),
      Error: err.message,
    });
  }
}
