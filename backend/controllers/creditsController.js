import contract from "../blockchain/contract.js";

export const issueCredit = async (req, res) => {
  try {
    const { amount } = req.body;
    const tx = await contract.issueCredit(amount);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const transferCredit = async (req, res) => {
  try {
    const { id, buyer } = req.body;
    const tx = await contract.transferCredit(id, buyer);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyCredit = async (req, res) => {
  try {
    const { id } = req.body;
    const tx = await contract.verifyCredit(id);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};