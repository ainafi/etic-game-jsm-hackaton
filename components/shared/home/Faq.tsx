
import { FAQItem } from './FAQItem'
import Image from 'next/image'

const faqData = [
  {
    question: "What are the service of Etic-store",
    answer: "sale of movie, series video games multi platform"
  },
  {
    question: "Where is Etic store located",
    answer: "Anosizato West "
  },
  {
    question: "availability time",
    answer: "Monday-Saturday 8Am-8Pm Sunday 8Am -6Pm" 
  },
]

export function FAQ() {
  return (
    <div className=" py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Can&apos;t find the answer you&apos;re looking for? Reach out to our{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                customer support
              </a>{' '}
              team.
            </p>
            <div className="mt-8 hidden lg:block">
              <Image
                src="/image/faq.svg"
                alt="FAQ Illustration"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <dl className="space-y-6">
              {faqData.map((item, index) => (
                <FAQItem key={index} question={item.question} answer={item.answer} />
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

