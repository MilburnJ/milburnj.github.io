// src/components/Skills.jsx
'use client';

import ScrollIndicator from './ScrollIndicator';
import { FaPython, FaJava, FaAws, FaHtml5, FaCss3, FaBrain } from 'react-icons/fa';
import {
  SiJavascript,
  SiC,
  SiSwift,
  SiGooglecloud,
  SiPytorch,
  SiTensorflow,
  SiKeras,
  SiScikitlearn,
  SiHuggingface,
  SiNumpy,
  SiPandas,
  SiOpencv,
  SiOpenai,
} from 'react-icons/si';

export default function Skills() {
  const skills = [
    { name: 'Python',        Icon: FaPython     },
    { name: 'JavaScript',    Icon: SiJavascript },
    { name: 'Java',          Icon: FaJava       },
    { name: 'C',             Icon: SiC          },
    { name: 'Swift',         Icon: SiSwift      },
    { name: 'HTML',          Icon: FaHtml5      },
    { name: 'CSS',           Icon: FaCss3       },
    { name: 'OpenAI',        Icon: SiOpenai     },
    { name: 'Hugging Face',  Icon: SiHuggingface},
    { name: 'PyTorch',       Icon: SiPytorch    },
    { name: 'TensorFlow',    Icon: SiTensorflow },
    { name: 'Keras',         Icon: SiKeras      },
    { name: 'scikit‑learn',  Icon: SiScikitlearn},
    { name: 'NumPy',         Icon: SiNumpy      },
    { name: 'Pandas',        Icon: SiPandas     },
    { name: 'OpenCV',        Icon: SiOpencv     },
    { name: 'AWS',           Icon: FaAws        },
    { name: 'GCP',           Icon: SiGooglecloud},
    { name: 'BERT',          Icon: SiHuggingface},
    { name: 'NLP',           Icon: FaBrain      }, 
  ];

  // Arrange into three centered rows: 6, 8, 6
  const layout = [6, 8, 6];
  let offset = 0;
  const rows = layout.map((count) => {
    const slice = skills.slice(offset, offset + count);
    offset += count;
    return slice;
  });

  return (
    <section
      id="skills"
      className="relative h-screen flex flex-col justify-center bg-gray-800 text-white px-8 snap-start"
    >
      {/* Move header down a bit */}
      <h2 className="mt-24 text-3xl font-bold text-center mb-8">Skills</h2>

      {/* Diamond‑style cluster of rows 5‑8‑5 */}
      <div className="flex-1 flex flex-col justify-center space-y-8">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-8">
            {row.map(({ name, Icon }) => (
              <div
                key={name}
                className="flex flex-col items-center transition-transform hover:scale-110"
              >
                <Icon className="text-5xl text-blue-400" />
                <span className="mt-2 text-sm">{name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Scroll arrow at bottom, clear of the icons */}
      <div className="flex justify-center pt-8 pb-12">
        <ScrollIndicator target="#featured-projects" />
      </div>
    </section>
  );
}
