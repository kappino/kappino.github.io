import { Publication } from '../types';

export const publications: Publication[] = [
  {
    id: 'esposito-ias19-2026',
    title: 'Emotion Recognition by EEG and Physiological Data in Patients with Schizophrenia: A Study with Wearable Devices',
    authors: [
      'Crescenzo Esposito',
      "Lorenzo D'Errico",
      'Federica Iannotta',
      'Felice Iasevoli',
      'Mariacarla Staffa',
    ],
    conference: '19th International Conference on Intelligent Autonomous Systems (IAS-19)',
    series: 'Lecture Notes in Networks and Systems (LNNS)',
    isbn: '978-3-032-33870-9',
    year: 2026,
    status: 'In Press',
    statusNote: 'Accepted & in publication — Forthcoming October 2026 with Springer Nature',
    abstract:
      'This paper presents a supervised machine learning framework for the classification of emotional states in patients diagnosed with schizophrenia using wireless wearable EEG telemetry. By acquiring 14-channel electroencephalographic recordings from 21 clinical subjects under emotion-eliciting auditory and visual stimulation, we developed an artifact-rejection pipeline based on PICARD-ICA and bandpass filtering. Multi-Layer Perceptron (MLP) and Random Forest models were trained on extracted Power Spectral Density (PSD) and Frontal Brain Asymmetry (FBA) features, yielding test accuracy rates up to 97.2%. The results demonstrate the viability of non-invasive wearable neurotechnologies in precision psychiatric assessment and autonomous assistive monitoring.',
    bibtex: `@inproceedings{esposito2026emotion,
  title={Emotion Recognition by EEG and Physiological Data in Patients with Schizophrenia: A Study with Wearable Devices},
  author={Esposito, Crescenzo and D'Errico, Lorenzo and Iannotta, Federica and Iasevoli, Felice and Staffa, Mariacarla},
  booktitle={Proceedings of the 19th International Conference on Intelligent Autonomous Systems (IAS-19)},
  series={Lecture Notes in Networks and Systems},
  isbn={978-3-032-33870-9},
  note={In press - Forthcoming October 2026},
  year={2026},
  publisher={Springer Nature}
}`,
    metrics: [
      { label: 'Conference Recognition', value: 'Best Student Paper Finalist', detail: 'Selected among top student papers at IAS-19' },
      { label: 'Clinical Trial Cohort', value: '21 Patients', detail: 'Healthy controls, responsive & resistant schizophrenic cohort' },
      { label: 'Hardware Sensor', value: 'Emotiv Epoc X', detail: '14 wireless wet electrodes @ 256 Hz' },
      { label: 'Peak Accuracy', value: '97.2%', detail: 'Multi-Layer Perceptron classifier with cross-validation' },
    ],
    featured: true,
  },
];
