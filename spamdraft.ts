const userId = '1';

const database = {
    users: {
        [userId]: {
            email: 'email@email.com',
            phoneNumber: '1234567890',
            username: 'username',
            displayName: 'firstName lastName',
            identifier: 'Job',
            bio: 'Bio text',
            imageUrl: null,
            createdAt: Date.now(),
            lastSignedInAt: Date.now(),
            posts: 0,
            clicks: 0,
            friends: 0
        }
    }
}