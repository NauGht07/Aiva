import { initLlama, LlamaContext } from 'llama.rn';

let context: LlamaContext | null = null;

export const initSLM = async () => {
    let modelPath: string = "/sdcard/Download/Phi-3-mini-4k-instruct-q4.gguf"

    console.log("loading model from", modelPath)
    context = await initLlama({model: modelPath});
    console.log("successfully loaded model")
};

export const isModelLoaded = () => {
    return context !== null;
};

export const extractOnboardingHabits = async (userInput: string) => {
    // console.log('context loaded:', context !== null)
    // console.log('user input:', userInput)

    // if (!context) return null

    // const prompt = `Extract habits from this text and respond in JSON only, no explanation:
    //                 "${userInput}"

    //                 Respond with exactly this format:
    //                 {"habits":[{"name":"habit name","frequency":"daily","reminder_time":"HH:MM"}]}`

    // console.log('running completion...')
    // const result = await context.completion({ prompt, stop: ['}'] })
    // console.log('raw result:', result.text)

    // try {
    //     const parsed = JSON.parse(result.text + "}")
    //     console.log('parsed:', parsed)
    //     return parsed
    // } catch(e) {
    //     console.log("parse error:", e)
    //     return null
    // }

    let text = userInput.trim().replace(/[.!?]+$/, '');
    text = text.replace(
        /^(to\s+|i want to\s+|i've been meaning to\s+|i need to\s+|i should\s+)/i,
        '',
    );
    return text.toLowerCase();
}
