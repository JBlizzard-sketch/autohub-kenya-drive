import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogPost {
  blog_post_id: number;
  title: string;
  content: string;
  slug: string;
  created_at: string;
  published: boolean;
  category_id: number | null;
  blog_categories: {
    name: string;
    blog_category_id: number;
  } | null;
}

interface BlogCategory {
  blog_category_id: number;
  name: string;
  description: string | null;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("blog_categories")
      .select("*")
      .order("name");

    if (!error && data) {
      setCategories(data);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    let query = supabase
      .from("blog_posts")
      .select(`
        *,
        blog_categories (
          name,
          blog_category_id
        )
      `)
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (selectedCategory) {
      query = query.eq("category_id", selectedCategory);
    }

    const { data, error } = await query;

    if (!error && data) {
      setPosts(data as BlogPost[]);
    }
    setLoading(false);
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    const text = content.replace(/<[^>]*>/g, "");
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <>
      <Helmet>
        <title>Auto Maintenance Tips & Guides - AutoHub Kenya Blog</title>
        <meta
          name="description"
          content="Expert automotive maintenance tips, DIY guides, and car care advice for Kenyan drivers. Learn how to maintain your vehicle in Kenyan conditions."
        />
        <meta name="keywords" content="car maintenance Kenya, auto repair tips, DIY car guides, vehicle care Nairobi, automotive blog Kenya" />
        <link rel="canonical" href={`${window.location.origin}/blog`} />
        
        <meta property="og:title" content="Auto Maintenance Tips & Guides - AutoHub Kenya Blog" />
        <meta property="og:description" content="Expert automotive maintenance tips and DIY guides for Kenyan drivers" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/blog`} />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "AutoHub Kenya Blog",
            "description": "Expert automotive maintenance tips and DIY guides for Kenyan drivers",
            "url": `${window.location.origin}/blog`,
            "publisher": {
              "@type": "Organization",
              "name": "AutoHub Kenya",
              "logo": {
                "@type": "ImageObject",
                "url": `${window.location.origin}/logo.png`
              }
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                AutoHub Kenya Blog
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
                Expert maintenance tips, DIY guides, and automotive advice tailored for Kenyan roads and conditions
              </p>
            </div>
          </section>

          {/* Categories Filter */}
          <section className="border-b bg-card">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => setSelectedCategory(null)}
                  size="sm"
                >
                  All Posts
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.blog_category_id}
                    variant={selectedCategory === category.blog_category_id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.blog_category_id)}
                    size="sm"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i}>
                      <Skeleton className="h-48 w-full rounded-t-lg" />
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-semibold mb-4">No posts found</h2>
                  <p className="text-muted-foreground">
                    {selectedCategory
                      ? "No posts in this category yet. Check back soon!"
                      : "Check back soon for automotive tips and guides."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <article key={post.blog_post_id}>
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg" />
                        
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-3">
                            {post.blog_categories && (
                              <Badge variant="secondary">{post.blog_categories.name}</Badge>
                            )}
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(post.created_at)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {getReadingTime(post.content)}
                              </span>
                            </div>
                          </div>
                          
                          <CardTitle className="text-xl hover:text-primary transition-colors">
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                          </CardTitle>
                          
                          <CardDescription className="line-clamp-3">
                            {getExcerpt(post.content)}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                          <Link to={`/blog/${post.slug}`}>
                            <Button variant="ghost" className="group">
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Blog;
