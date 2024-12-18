"use client";
import { motion } from "framer-motion";
import { FileUpload } from "@/components/ui/file-upload";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { extractTextFromPDF } from "@/utils/ExtractText";
import {
  ArrowLeft,
  Lightbulb,
  Loader2,
  Star,
  Target,
  TrendingUp,
  Zap,
  Book,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Result {
  worth: string;
  skills: {
    technical_skills: string[];
    soft_skills: string[];
    domain_specific_skills: string[];
  };
  keyFactors: string[];
  areasForImprovement: string[];
  actionableAdvice: string[];
}

const Page = () => {
  const { toast } = useToast();
  const [result, setResult] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File[]>([]);

  const handleFileUpload = (file: File[]) => {
    setResumeFile(file);
  };

  const handleResumeAnalysis = async () => {
    if (resumeFile.length === 0) {
      return;
    }
    try {
      setIsLoading(true);
      const file = resumeFile[0];

      const resumeText = await extractTextFromPDF(file);
      const context = `RESUME: ${resumeText}\n\n-------`;
      const response = await fetch("/api/review", {
        method: "POST",
        body: JSON.stringify({ prompt: context }),
      });

      if (!response.ok) {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Failed to fetch resume review.",
        });
        throw new Error("Failed to fetch resume review.");
      }

      const review = await response.json();
      setResult(review);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to roast resume. Please try again.",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (resumeFile.length > 0) {
      handleResumeAnalysis();
    }
  }, [resumeFile]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 mb-4">
        Discover Your Resume's True Worth
      </h1>
      <i className="flex justify-center items-center text-2xl text-center text-gray-600 mb-8">
        Unlock your career potential with our AI-powered resume analysis
      </i>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">
            Analyzing your resume...
          </p>
        </div>
      ) : result.length === 0 ? (
        <div className="text-center mb-8 space-y-4">
          <p className="text-xl text-gray-700">
            Upload your resume and choose your destiny:
          </p>
          <div className="w-full max-w-3xl mx-auto">
            <FileUpload onChange={handleFileUpload} />
          </div>
        </div>
      ) : (
        result.map(
          (
            {
              worth,
              keyFactors,
              actionableAdvice,
              areasForImprovement,
              skills,
            },
            index
          ) => (
            <div key={index} className="space-y-6">
              <Link href={"/"}>
                <Button variant="outline" className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Start Over
                </Button>
              </Link>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-bold text-purple-700 flex items-center">
                    <Star className="mr-2" /> Overall Worth
                  </h2>
                  <p className="text-gray-800 dark:text-slate-400 text-lg">Rs. {worth}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-blue-700 flex items-center">
                    <TrendingUp className="mr-2" /> Key Factors
                  </h2>
                  <ul className="space-y-2">
                    {keyFactors.map((item, idx) => (
                      <motion.li
                        key={idx}
                        className="text-gray-800 dark:text-slate-400 flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      >
                        <Zap className="mt-1 flex-shrink-0 text-blue-500" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-yellow-700 flex items-center">
                    <Target className="mr-2" /> Areas for Improvement
                  </h2>
                  <ul className="space-y-2">
                    {areasForImprovement.map((item, idx) => (
                      <motion.li
                        key={idx}
                        className="text-gray-800 dark:text-slate-400 f flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      >
                        <Target className="mt-1 flex-shrink-0 text-yellow-500" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-indigo-700 flex items-center">
                    <Book className="mr-2" /> Skills
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-indigo-600 mb-1">
                        Technical Skills
                      </h3>
                      {skills.technical_skills.map((ts, idx) => (
                        <Badge key={idx} className="mr-2 mb-2">
                          {ts}
                        </Badge>
                      ))}
                    </div>
                    <div>
                      <h3 className="font-semibold text-indigo-600 mb-1">
                        Soft Skills
                      </h3>
                      {skills.soft_skills.map((ss, idx) => (
                        <Badge key={idx} className="mr-2 mb-2">
                          {ss}
                        </Badge>
                      ))}
                    </div>
                    <div>
                      <h3 className="font-semibold text-indigo-600 mb-1">
                        Domain-Specific Skills
                      </h3>
                      {skills.domain_specific_skills.map((ds, idx) => (
                        <Badge key={idx} className="mr-2 mb-2">
                          {ds}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-700 flex items-center">
                    <Lightbulb className="mr-2" /> Actionable Advice
                  </h2>
                  <ul className="space-y-2">
                    {actionableAdvice.map((item, idx) => (
                      <motion.li
                        key={idx}
                        className="text-gray-800 dark:text-slate-400  flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      >
                        <Briefcase className="mt-1 flex-shrink-0 text-green-500" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default Page;
