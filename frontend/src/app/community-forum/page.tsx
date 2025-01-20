"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ForumCategories from "@/components/forum/ForumCategories";
import ThreadList from "@/components/forum/ThreadList";
import SearchAndFilter from "@/components/forum/SearchAndFilter";
import UserProfile from "@/components/forum/UserProfile";
import Notifications from "@/components/forum/Notifications";
import Guidelines from "@/components/forum/Guidelines";
import Analytics from "@/components/forum/Analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Thread {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  createdAt: Date;
  upvotes: number;
  replies: number;
}

export default function CommunityForumPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreateThread = (newThread: Thread) => {
    setThreads([newThread, ...threads]);
  };

  const handleUpvote = (threadId: string) => {
    setThreads(
      threads.map((thread) =>
        thread.id === threadId
          ? { ...thread, upvotes: thread.upvotes + 1 }
          : thread
      )
    );
  };

  const filteredThreads = threads
    .filter((thread) =>
      selectedCategory ? thread.category === selectedCategory : true
    )
    .filter(
      (thread) =>
        thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        thread.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Community Forum</h1>
          <Button
            onClick={() => {
              /* Open create thread modal */
            }}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Create New Thread
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-3">
            <SearchAndFilter
              onSearch={setSearchTerm}
              onFilter={setSelectedCategory}
            />
            <Tabs defaultValue="threads" className="mt-6">
              <TabsList>
                <TabsTrigger value="threads">All Threads</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
              </TabsList>
              <TabsContent value="threads">
                <ThreadList threads={filteredThreads} onUpvote={handleUpvote} />
              </TabsContent>
              <TabsContent value="popular">
                <ThreadList
                  threads={filteredThreads.sort(
                    (a, b) => b.upvotes - a.upvotes
                  )}
                  onUpvote={handleUpvote}
                />
              </TabsContent>
              <TabsContent value="recent">
                <ThreadList
                  threads={filteredThreads.sort(
                    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
                  )}
                  onUpvote={handleUpvote}
                />
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-6">
            <UserProfile />
            <ForumCategories onSelectCategory={setSelectedCategory} />
            <Notifications />
            <Guidelines />
            <Analytics />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
