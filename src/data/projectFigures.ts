export type Flow = {
  title: string;
  steps: readonly (readonly [label: string, detail: string])[];
};

export const projectFlows: Record<string, Flow> = {
  'proj-tnes': { title: 'From game to network lab', steps: [
    ['Unreal Engine', 'Player selects two ports'], ['FastAPI gateway', 'Map game ports to lab interfaces'], ['Cisco Modeling Labs', 'Check the virtual connection'], ['Unreal Engine feedback', 'Show whether the lab confirmed it'],
  ] },
  'proj-agy-telegram': { title: 'From Telegram to the local session', steps: [
    ['Telegram', 'Send a prompt from a permitted account'], ['Python bridge', 'Receive the update over HTTPS long polling'], ['tmux buffer', 'Paste the prompt into the local session'],
  ] },
  'proj-mtls-iot-gateway': { title: 'Trust checks along the telemetry path', steps: [
    ['Programmable BLE sender', 'Authenticated payload'], ['ESP32', 'HMAC verification'], ['Mosquitto', 'Client certificates and topic permissions'], ['Python bridge', 'SQLite readings and EVM audit records'],
  ] },
  'proj-care-decision-planner': { title: 'From care records to robot actions', steps: [
    ['CARE backend', 'Therapies, readings and session state'], ['GoRules', 'Decision tables evaluate the current context'], ['ROS2 coordinator', 'Receives action requests from the planner'],
  ] },
  'proj-spectra-eeg': { title: 'From wearable recordings to model inputs', steps: [
    ['Emotiv EPOC X', '14 channels at 256 Hz'], ['MATLAB and EEGLAB', 'Segment, filter and remove artifacts'], ['Python', 'Spectral and asymmetry features'], ['scikit-learn', 'Evaluate group and clip classifiers'],
  ] },
  'proj-munnisc-cestinno': { title: 'Sensing and actuation', steps: [
    ['Ultrasonic and capacitive sensors', 'Measure distance and detect proximity'], ['STM32 with ChibiOS', 'Poll inputs and coordinate actuation'], ['PWM output', 'Drive the servo that moves the sorting flap'],
  ] },
  'proj-posix-sockets': { title: 'Request and storage path', steps: [
    ['Client application', 'Issue, verify, or update a record'], ['TCP service', 'Read the complete request from the stream'], ['Forked worker', 'Handle the request concurrently'], ['Shared binary file', 'Coordinate updates using advisory locks'],
  ] },
  'proj-virtual-pong': { title: 'From wrist motion to the multiplayer match', steps: [
    ['Apple Watch', 'Capture motion and classify the swing with Core ML'], ['WatchConnectivity', 'Send the gesture to the paired iPhone'], ['iPhone', 'Apply the gesture to the game'], ['Nearby peer', 'Exchange game state via MultipeerConnectivity'],
  ] },
  'proj-pepper-icsr': { title: 'Tablet and robot interaction', steps: [
    ['Web interface', 'Select a scene or answer a question'], ['Python WebSocket backend', 'Coordinate scene and interaction state'], ['Pepper', 'Deliver speech via NAOqi'],
  ] },
};

export const articleFlows: Record<string, { en: Flow; it: Flow }> = {
  'agy-telegram-mobile-cockpit': {
    en: projectFlows['proj-agy-telegram'],
    it: { title: 'Da Telegram alla sessione locale', steps: [['Telegram', 'Invio del prompt da un account autorizzato'], ['Bridge Python', 'Riceve l’aggiornamento tramite long polling HTTPS'], ['Buffer tmux', 'Incolla il prompt nella sessione locale']] },
  },
  'ansi-scraping-vs-structured-jsonl': {
    en: { title: 'Follow events as they are written', steps: [['Agent transcript', 'Append-only JSONL'], ['Transcript watcher', 'Read new records'], ['Telegram', 'Show status and final output']] },
    it: { title: 'Seguire gli eventi man mano che vengono scritti', steps: [['Trascrizione', 'Registro JSONL'], ['Watcher', 'Legge i nuovi eventi'], ['Telegram', 'Mostra stato e risposta finale']] },
  },
};
