import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      image: "/content/testimonial-1.jpg",
      quote: "ContentHubMedia has completely transformed how I consume media. Having all my favorite content types in one place saves me so much time and the recommendations are spot-on!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      image: "/content/testimonial-2.jpg",
      quote: "As a developer, I appreciate the technical excellence of ContentHubMedia. The platform is lightning fast, and the courses have helped me level up my skills significantly.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Content Creator",
      image: "/content/testimonial-3.jpg",
      quote: "The quality of content on this platform is exceptional. I've found inspiration for my own work and learned so much from the articles and courses available.",
      rating: 5
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Student",
      image: "/content/testimonial-4.jpg",
      quote: "ContentHubMedia has been an invaluable resource for my studies. The courses are well-structured, and I can take breaks with games or music without switching apps.",
      rating: 5
    }
  ];

  // Закомментированный блок отзывов
  return null;

  /*
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our community has to say about their ContentHubMedia experience.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 z-10 hidden md:block">
            <button className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 z-10 hidden md:block">
            <button className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:px-8">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-4 bg-gray-200">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`;
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-10 space-x-2">
            <button className="w-3 h-3 rounded-full bg-blue-600"></button>
            <button className="w-3 h-3 rounded-full bg-gray-300"></button>
            <button className="w-3 h-3 rounded-full bg-gray-300"></button>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center bg-blue-50 px-6 py-3 rounded-full">
            <span className="text-blue-600 font-medium">Join over 10,000+ satisfied users worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
  */
};

export default TestimonialsSection;
