import React from 'react';
import { GraduationCap, Award, BookOpen, BarChart, Users } from 'lucide-react';

const CoursesSection: React.FC = () => {
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Educational Courses for Skill Development</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enhance your skills and knowledge with our comprehensive courses designed to help you grow personally and professionally.
          </p>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pl-10">
            <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
              {/* Используем предоставленную иллюстрацию */}
              <div className="w-full aspect-square rounded-xl mb-6 flex items-center justify-center">
                <img 
                  src="/landing/course.png" 
                  alt="Course Content" 
                  className="w-full h-auto max-h-[512px] object-contain"
                />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Learn at Your Own Pace</h3>
              <p className="text-gray-600 mb-6">
                Our courses are designed to fit into your busy schedule, allowing you to learn new skills and expand your knowledge whenever and wherever it's convenient for you.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Expert Instructors</h4>
                    <p className="text-sm text-gray-500">Learn from industry leaders and academic experts</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                    <BookOpen className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Comprehensive Curriculum</h4>
                    <p className="text-sm text-gray-500">Structured learning paths with practical exercises</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                    <BarChart className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Track Your Progress</h4>
                    <p className="text-sm text-gray-500">Monitor your advancement with detailed analytics</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-50 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-yellow-50 rounded-full"></div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-yellow-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why You'll Love Our Courses</h3>
              
              <ul className="space-y-6">
                <li className="flex">
                  <div className="bg-yellow-500 p-2 rounded-full mr-4 flex-shrink-0">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Skill Enhancement</h4>
                    <p className="text-yellow-100">
                      Develop practical skills that you can immediately apply to your personal and professional life.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="bg-yellow-500 p-2 rounded-full mr-4 flex-shrink-0">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Community Learning</h4>
                    <p className="text-yellow-100">
                      Connect with fellow learners, share insights, and collaborate on projects to enhance your learning experience.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="bg-yellow-500 p-2 rounded-full mr-4 flex-shrink-0">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Certification</h4>
                    <p className="text-yellow-100">
                      Earn certificates upon course completion to showcase your newly acquired skills and knowledge.
                    </p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-yellow-500">
                <p className="font-medium">
                  "Our courses are designed to transform your potential into expertise, providing you with the knowledge and skills you need to succeed in today's rapidly evolving world."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
