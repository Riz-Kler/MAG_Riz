import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Passenger service live' });
});

export default router;