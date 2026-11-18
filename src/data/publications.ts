import type { Publication } from '../types';

const ias19Doi = '10.1007/978-3-032-33874-7_13';
const ias19Title = 'Emotion Recognition by EEG and Physiological Data in Patients with Schizophrenia: A Study with Wearable Devices';
const ias19EbookIsbn = '978-3-032-33874-7';

export const ias19Publication: Publication = {
  id: 'esposito-ias19-2026',
  title: ias19Title,
  authors: [
    'Crescenzo Esposito',
    "Lorenzo D'Errico",
    'Federica Iannotta',
    'Felice Iasevoli',
    'Mariacarla Staffa',
  ],
  conference: '19th International Conference on Intelligent Autonomous Systems (IAS-19)',
  conferenceLocationAndYear: 'Genoa, 2025',
  series: 'Lecture Notes in Networks and Systems, vol. 2103',
  isbn: ias19EbookIsbn,
  year: 2027,
  publishedOn: '2026-09-02',
  status: 'Published online',
  statusNote: 'Best Student Paper Award finalist',
  doiUrl: 'https://doi.org/' + ias19Doi,
  abstract:
    'SPECTRA investigated whether wearable EEG and other physiological signals could help characterize emotional responses in people with schizophrenia. Participants completed a cognitive task and watched three two-minute clips. The team preprocessed the recordings in MATLAB, extracted features in Python, and examined alpha and beta activity and frontal brain asymmetry in relation to valence and arousal. The IAS-19 abstract reports up to 95% accuracy in classifying healthy controls and participants with treatment-responsive or treatment-resistant schizophrenia. The study included 21 participants and a limited set of stimuli.',
  bibtex: `@inproceedings{10.1007/978-3-032-33874-7_13,
  title={${ias19Title}},
  author={Esposito, Crescenzo and D'Errico, Lorenzo and Iannotta, Federica and Iasevoli, Felice and Staffa, Mariacarla},
  editor={Mastrogiovanni, Fulvio and Amigoni, Francesco},
  booktitle={Intelligent Autonomous Systems 19},
  series={Lecture Notes in Networks and Systems},
  volume={2103},
  pages={174--185},
  isbn={${ias19EbookIsbn}},
  doi={${ias19Doi}},
  year={2027},
  publisher={Springer Nature Switzerland},
  address={Cham}
}`,
  metrics: [
    { label: 'Conference recognition', value: 'Best Student Paper Award finalist' },
    { label: 'Wearable EEG', value: '14 channels' },
  ],
  featured: true,
};

export const publications = [ias19Publication];
