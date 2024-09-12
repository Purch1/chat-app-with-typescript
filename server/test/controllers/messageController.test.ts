// import { sendMessage } from '../../src/web/controllers/MessageController';
// import { Request, Response } from 'express';

// describe('MessageController', () => {
//     it('should send a message', async () => {
//         const req = {
//             body: {
//                 content: 'Hello, World!',
//                 senderId: '123',
//                 chatRoomId: '456',
//             },
//         } as Request;

//         const res = {
//             status: jest.fn().mockReturnThis(),
//             send: jest.fn(),
//         } as any as Response;

//         await sendMessage(req, res);

//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.send).toHaveBeenCalledWith('Message sent');
//     });
// });
