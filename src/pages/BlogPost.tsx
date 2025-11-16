import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { toast } from "sonner";

interface BlogPost {
  blog_post_id: number;
  title: string;
  content: string;
  slug: string;
  created_at: string;
  updated_at: string;
  published: boolean;
  category_id: number | null;
  blog_categories: {
    name: string;
    blog_category_id: number;
  } | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        blog_categories (
          name,
          blog_category_id
        )
      `)
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (!error && data) {
      setPost(data as BlogPost);
      fetchRelatedPosts(data.category_id, data.blog_post_id);
    }
    setLoading(false);
  };

  const fetchRelatedPosts = async (categoryId: number | null, currentPostId: number) => {
    if (!categoryId) return;

    const { data } = await supabase
      .from("blog_posts")
      .select(`
        *,
        blog_categories (
          name,
          blog_category_id
        )
      `)
      .eq("category_id", categoryId)
      .eq("published", true)
      .neq("blog_post_id", currentPostId)
      .order("created_at", { ascending: false })
      .limit(3);

    if (data) {
      setRelatedPosts(data as BlogPost[]);
    }
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: `Check out this article: ${post?.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1">
            <article className="container mx-auto px-4 py-12 max-w-4xl">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-8" />
              <Skeleton className="h-96 w-full mb-8" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </article>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The blog post you're looking for doesn't exist.
              </p>
              <Link to="/blog">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  const excerpt = post.content.replace(/<[^>]*>/g, "").substring(0, 160);

  return (
    <>
      <Helmet>
        <title>{post.title} - AutoHub Kenya Blog</title>
        <meta name="description" content={excerpt} />
        <meta name="keywords" content={`${post.blog_categories?.name}, car maintenance, auto tips Kenya`} />
        <link rel="canonical" href={`${window.location.origin}/blog/${post.slug}`} />
        
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${window.location.origin}/blog/${post.slug}`} />
        <meta property="article:published_time" content={post.created_at} />
        <meta property="article:modified_time" content={post.updated_at} />
        {post.blog_categories && (
          <meta property="article:section" content={post.blog_categories.name} />
        )}
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": excerpt,
            "datePublished": post.created_at,
            "dateModified": post.updated_at,
            "author": {
              "@type": "Organization",
              "name": "AutoHub Kenya"
            },
            "publisher": {
              "@type": "Organization",
              "name": "AutoHub Kenya",
              "logo": {
                "@type": "ImageObject",
                "url": `${window.location.origin}/logo.png`
              }
            },
            "articleSection": post.blog_categories?.name,
            "url": `${window.location.origin}/blog/${post.slug}`
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          <article className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
            {/* Back Button */}
            <Link to="/blog" className="inline-block mb-6">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            {/* Article Header */}
            <header className="mb-8">
              {post.blog_categories && (
                <Badge variant="secondary" className="mb-4">
                  {post.blog_categories.name}
                </Badge>
              )}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.created_at)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {getReadingTime(post.content)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="ml-auto"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Featured Image */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-8" />
            </header>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-ul:text-foreground/90 prose-ol:text-foreground/90"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="border-t bg-muted/30 py-12">
              <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.blog_post_id}
                      to={`/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4" />
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(relatedPost.created_at)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
