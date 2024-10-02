import { Request, Response, Router } from 'express';

const router = Router();

router.get('/ping', (_: Request, res: Response) => {
    res.status(200).json({ message: 'Server us healthy' });
});

export default router;
