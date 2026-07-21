"use client";

import { TOPICS, getWordsByTopic } from "@/lib/vocab-data";
import { ProgressData } from "@/lib/srs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface TopicPickerProps {
  progress: ProgressData | null;
  onPick: (topicId: string) => void;
}

export function TopicPicker({ progress, onPick }: TopicPickerProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {TOPICS.map((topic, i) => {
        const words = getWordsByTopic(topic.id);
        const learned = words.filter(w => progress?.learnedWordIds.includes(w.id)).length;
        const pct = Math.round((learned / words.length) * 100);
        return (
          <motion.button
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => onPick(topic.id)}
            className="text-left"
          >
            <Card className={`relative overflow-hidden border-0 bg-gradient-to-br ${topic.color} text-white hover:shadow-xl transition-all hover:-translate-y-1`}>
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/15 blur-xl" />
              <div className="p-5 relative">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{topic.emoji}</div>
                  <Badge className="bg-white/25 text-white border-0 hover:bg-white/25">
                    {learned}/{words.length}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold mb-1">{topic.name}</h3>
                <p className="text-sm opacity-90 mb-3">{topic.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-white/30 overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold">{pct}%</span>
                </div>
              </div>
            </Card>
          </motion.button>
        );
      })}
    </div>
  );
}
