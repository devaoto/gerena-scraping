import { SpeechClient } from '@google-cloud/speech';

const client = new SpeechClient();

export async function recognizeNumbers(audioURL: string): Promise<{
  numbers: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null | undefined)[];
}> {
  const audio = {
    uri: audioURL,
  };

  const config = {
    encoding: 'LINEAR16' as const,
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };

  const request = {
    audio: audio,
    config: config,
  };

  try {
    const [response] = await client.recognize(request);
    const transcription = response.results
      ?.map((result) => result.alternatives?.[0].transcript)
      ?.join('\n');

    const numbers: any =
      transcription !== undefined
        ? transcription
            .match(
              /\b(?:zero|one|two|three|four|five|six|seven|eight|nine)\b/gi
            )
            ?.map((word: string) => {
              switch (word.toLowerCase()) {
                case 'zero':
                  return 0;
                case 'one':
                  return 1;
                case 'two':
                  return 2;
                case 'three':
                  return 3;
                case 'four':
                  return 4;
                case 'five':
                  return 5;
                case 'six':
                  return 6;
                case 'seven':
                  return 7;
                case 'eight':
                  return 8;
                case 'nine':
                  return 9;
                default:
                  return null;
              }
            })
            .filter((number: number | null) => number !== null)
        : [];

    return { numbers };
  } catch (err) {
    console.error('Error:', err);
    return { numbers: [] };
  }
}
