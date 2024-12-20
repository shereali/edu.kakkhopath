export default function (message: string) {
  function getVoices() {
    return new Promise<SpeechSynthesisVoice[]>((resolve) => {
      let voices = speechSynthesis.getVoices()
      if (voices.length > 0) {
        resolve(voices)
      } else {
        // Wait for voices to be available
        speechSynthesis.onvoiceschanged = () => {
          voices = speechSynthesis.getVoices()
          resolve(voices)
        }
      }
    })
  }

  function speak(
    text: string,
    voice: SpeechSynthesisVoice | null,
    rate: number,
    pitch: number,
    volume: number
  ) {
    // If no valid voice is found, use default
    if (!voice) {
      console.error('No valid voice found.')
      return
    }

    // Create a SpeechSynthesisUtterance to configure the voice settings
    const speakData = new SpeechSynthesisUtterance()
    speakData.volume = volume // From 0 to 1
    speakData.rate = rate // From 0.1 to 10
    speakData.pitch = pitch // From 0 to 2
    speakData.text = text
    speakData.lang = 'en'
    speakData.voice = voice

    // Pass the SpeechSynthesisUtterance to speechSynthesis.speak to start speaking
    speechSynthesis.speak(speakData)
  }

  if ('speechSynthesis' in window) {
    getVoices().then((voices) => {
      // Use a fallback if there are not enough voices
      const voice = voices.length > 2 ? voices[2] : voices[0] // Default to the first voice if needed
      const rate = 0.5,
        pitch = 2,
        volume = 1

      speak(message, voice, rate, pitch, volume)
    })
  } else {
    console.log('Speech Synthesis Not Supported 😞')
  }
}
