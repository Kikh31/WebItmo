import bridge from "@vkontakte/vk-bridge";

export const StoryPanel = async () => {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        const ResponseImageUrl = data.message;

        await bridge.send('VKWebAppShowStoryBox', {
            background_type: 'image',
            url: ResponseImageUrl
        })
    } catch (error) {
        console.log('Error:', error);
    }
}