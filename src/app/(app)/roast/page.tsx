"use client";

import { Button } from "@/components/ui/button";
import { TypeAnimation } from "react-type-animation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCompletion } from "ai/react";
import { extractTextFromPDF } from "@/utils/ExtractText";
import { ArrowLeft, Loader2, Flame, FileText } from "lucide-react";
import Link from "next/link";

type RoastLevel = "Mild" | "Medium" | "Spicy";

const Page = () => {
  const { toast } = useToast();
  const [resumeFile, setResumeFile] = useState<File[]>([]);
  const [roastLevel, setRoastLevel] = useState<RoastLevel>("Mild");
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const { complete, completion, isLoading } = useCompletion({
    api: "/api/roast",
  });

  const handleFileUpload = (file: File[]) => {
    setResumeFile(file);
  };

  const handleResumeAnalysis = async () => {
    if (resumeFile.length === 0) {
      return;
    }
    try {
      setUploadLoading(true);
      const file = resumeFile[0];

      const resumeText = await extractTextFromPDF(file);
      const prompt: string = `ROAST_LEVEL: ${roastLevel}\n\nRESUME: ${resumeText}\n\n-------`;

      await complete(prompt);
      setUploadLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to roast resume. Please try again.",
      });
      setUploadLoading(false);
    }
  };

  useEffect(() => {
    if (resumeFile.length > 0 && roastLevel) {
      handleResumeAnalysis();
    }
  }, [resumeFile, roastLevel]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mb-4">
              Resume Roaster AI
            </h1>
            <i className="text-2xl text-muted-foreground">
              Get brutally honest feedback on your resume
            </i>
          </div>

          {!uploadLoading && completion === "" ? (
            <div className="mt-8 p-6 shadow-lg">
              <div className="space-y-8 pt-6">
                <div className="flex items-center justify-center">
                  <div className="flex space-x-2 text-muted-foreground">
                    <FileText className="w-5 h-5" />
                    <span>Upload your resume and select your roast level</span>
                  </div>
                </div>
                <div className="grid gap-6 max-w-md mx-auto">
                  <div className="space-y-2">
                    <Label htmlFor="roastLevel" className="text-lg font-medium">
                      Choose Your Roast Level
                    </Label>
                    <Select
                      value={roastLevel}
                      onValueChange={(value: RoastLevel) =>
                        setRoastLevel(value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Roast Level">
                          <div className="flex items-center space-x-2">
                            <Flame className="w-4 h-4" />
                            <span>{roastLevel}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mild">
                          🌱 Mild - Constructive
                        </SelectItem>
                        <SelectItem value="Medium">
                          🔥 Medium - Direct
                        </SelectItem>
                        <SelectItem value="Spicy">💀 Spicy - Brutal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-lg font-medium">Upload Resume</Label>
                    <FileUpload onChange={handleFileUpload} />
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {isLoading ? (
            <div className="p-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-lg text-muted-foreground">
                  Roasting your resume...
                </p>
              </div>
            </div>
          ) : completion ? (
            <div className="space-y-6">
              <Link href="/">
                <Button variant="outline" className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Start Over
                </Button>
              </Link>
              <div className="p-6 border-2 border-border/50 shadow-lg">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                    <Flame className="w-6 h-6 text-orange-500" />
                    <span>Prepare to feel the burn! 🔥</span>
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <TypeAnimation
                      sequence={[completion]}
                      speed={99}
                      wrapper="p"
                      cursor={true}
                      className="text-foreground leading-loose"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Page;
