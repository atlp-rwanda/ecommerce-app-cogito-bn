import { product } from '../database/models';

const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await product.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    return res.json({ status: 'success', item });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [updatedCount] = await product.update(req.body, {
      where: { id },
    });

    if (updatedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const updatedItem = await product.findByPk(id);
    return res.json({ status: 'success', message: 'Item updated', item: updatedItem });
  } catch (error) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
};

export { getProduct, updateProduct };
