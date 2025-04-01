const handleSubmit = async (event: any) => {
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