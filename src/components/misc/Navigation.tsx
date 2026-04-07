// Navigation.tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function Navigation({ pathname }: { pathname: string }) {
  // Helper to check if the link is active
  const isCurrent = (href: string) => pathname === href;

  return (
    <Breadcrumb className="select-none">
      <BreadcrumbList>
        {/* Home */}
        <BreadcrumbItem>
          {isCurrent("/") ? (
            <BreadcrumbPage>home</BreadcrumbPage>
          ) : (
            <BreadcrumbLink render={<a href="/">home</a>} />
          )}
        </BreadcrumbItem>

        <BreadcrumbSeparator>•</BreadcrumbSeparator>

        {/* Portfolio */}
        <BreadcrumbItem>
          {isCurrent("/portfolio") ? (
            <BreadcrumbPage>portfolio</BreadcrumbPage>
          ) : (
            <BreadcrumbLink render={<a href="/portfolio">portfolio</a>} />
          )}
        </BreadcrumbItem>

        <BreadcrumbSeparator>•</BreadcrumbSeparator>

        {/* Blogs */}
        <BreadcrumbItem>
          {isCurrent("/blogs") ? (
            <BreadcrumbPage>blogs</BreadcrumbPage>
          ) : (
            <BreadcrumbLink render={<a href="/blogs">blogs</a>} />
          )}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
