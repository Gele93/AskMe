import { CreateUserDto, LoginUserDto } from "../types/types";

export const handleSetSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('name', "name");
    formData.append('description', "description");

    try {
        const response = await fetch('/api/set/unformated', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        const result = await response.json();
        console.log('Success:', result);
    } catch (error) {
        console.error('Error:', error);
    }
};

export const fetchRegisterUser = async (user: CreateUserDto) => {
    try {
        const response = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Failed to register user');
        }
        console.log('User registered successfully:');
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

export const fetchLoginUser = async (user: LoginUserDto) => {
    try {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Failed to login user');
        }
        const result = await response.json();
        return result
    } catch (error) {
        console.error('Error logging in user:', error);
    }
};