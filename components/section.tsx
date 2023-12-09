import { cn } from "@/helpers"

const Section: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <section
      className={cn("py-12", className)}
      {...props}
    >
      {children}
    </section>
  )
}

export {
  Section
}