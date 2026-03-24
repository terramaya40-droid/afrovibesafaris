import React from 'react';
import './FAQ.css';

const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "What is the best time to visit East Africa?",
      a: "The best time for safari is during the dry season from late June to October. For the Great Migration in Masai Mara, target July to September."
    },
    {
      q: "Do I need a visa for Kenya or Tanzania?",
      a: "Most visitors require an e-Visa. Kenya now has an Electronic Travel Authorization (eTA). We recommend applying at least 2 weeks before travel."
    },
    {
      q: "Is it safe to go on a safari?",
      a: "Yes, and highly regulated. Our guides are experts in wildlife behavior and safety protocols. You'll be in customized, safe vehicles at all times."
    },
    {
      q: "What should I pack for my safari?",
      a: "Neutral colored clothing (khaki, beige), a good hat, sunscreen, binoculars, and a light jacket for early morning game drives."
    }
  ];

  return (
    <div className="faq-page pb-2xl">
      <section className="faq-hero py-2xl bg-deep text-center">
        <div className="container">
          <h1 className="text-white">Frequently Asked Questions</h1>
          <p className="text-muted">Everything you need to know before your adventure.</p>
        </div>
      </section>

      <section className="container mt-2xl">
        <div className="faq-grid">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item reveal">
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQ;
