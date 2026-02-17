export const ChatServices = {

    AnswerStream: async (subject: string, question: string, onData: (data: any) => void) => {
        const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${baseURL}/answerQuiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subject, question }),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('Response body is null');

        const decoder = new TextDecoder();
        let buffer = '';

        try {
            let currentEvent = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');

                // Keep the last incomplete line in the buffer
                buffer = lines[lines.length - 1];

                for (let i = 0; i < lines.length - 1; i++) {
                    const line = lines[i].trim();
                    
                    if (line.startsWith('event:')) {
                        currentEvent = line.replace('event:', '').trim();
                    } else if (line.startsWith('data:') && currentEvent) {
                        const jsonString = line.replace('data:', '').trim();
                        try {
                            const data = JSON.parse(jsonString);
                            onData({ event: currentEvent, ...data });
                            currentEvent = '';
                        } catch (e) {
                            console.error('Failed to parse JSON:', jsonString);
                        }
                    }
                }
            }

            // Process any remaining data in the buffer
            if (buffer.trim()) {
                const line = buffer.trim();
                if (line.startsWith('event:')) {
                    currentEvent = line.replace('event:', '').trim();
                } else if (line.startsWith('data:') && currentEvent) {
                    const jsonString = line.replace('data:', '').trim();
                    try {
                        const data = JSON.parse(jsonString);
                        onData({ event: currentEvent, ...data });
                    } catch (e) {
                        console.error('Failed to parse JSON:', jsonString);
                    }
                }
            }
        } finally {
            reader.releaseLock();
        }
    }
}