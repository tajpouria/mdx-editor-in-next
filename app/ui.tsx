// @ts-nocheck

// Button Component
export const Button = ({
  className,
  variant = "default",
  size = "default",
  ...props
}) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-md font-medium transition-colors 
        focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 
        disabled:pointer-events-none disabled:opacity-50
        ${
          variant === "default"
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : ""
        }
        ${
          variant === "secondary"
            ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            : ""
        }
        ${
          variant === "outline"
            ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            : ""
        }
        ${size === "default" ? "h-10 px-4 py-2" : ""}
        ${size === "sm" ? "h-9 rounded-md px-3" : ""}
        ${size === "lg" ? "h-11 rounded-md px-8" : ""}
        ${className}`}
      {...props}
    />
  );
};

// Card Components
export const Card = ({ className, ...props }) => {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-xs ${className}`}
      {...props}
    />
  );
};

export const CardHeader = ({ className, ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
  );
};

export const CardTitle = ({ className, ...props }) => {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  );
};

export const CardContent = ({ className, ...props }) => {
  return <div className={`p-6 pt-0 ${className}`} {...props} />;
};

// Progress Component
export const Progress = ({ value = 0, className, ...props }) => {
  return (
    <div
      className={`relative h-4 w-full overflow-hidden rounded-full bg-secondary ${className}`}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
};

// Badge Component
export const Badge = ({ variant = "default", className, ...props }) => {
  return (
    <div
      className={`
        inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors
        ${
          variant === "default"
            ? "border-transparent bg-primary text-primary-foreground"
            : ""
        }
        ${
          variant === "secondary"
            ? "border-transparent bg-secondary text-secondary-foreground"
            : ""
        }
        ${variant === "outline" ? "text-foreground" : ""}
        ${className}`}
      {...props}
    />
  );
};

// Tabs Components
export const Tabs = ({ value, onValueChange, className, ...props }) => {
  return <div className={`flex flex-col ${className}`} {...props} />;
};

export const TabsList = ({ className, ...props }) => {
  return (
    <div
      className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}
      {...props}
    />
  );
};

export const TabsTrigger = ({ value, className, ...props }) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all
        focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50
        data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs
        ${className}`}
      {...props}
    />
  );
};

export const TabsContent = ({ value, className, ...props }) => {
  return (
    <div
      className={`mt-2 ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
      {...props}
    />
  );
};

// Separator Component
export const Separator = ({ className, ...props }) => {
  return (
    <div
      className={`shrink-0 bg-border h-[1px] w-full ${className}`}
      {...props}
    />
  );
};

// ScrollArea Component
export const ScrollArea = ({ className, ...props }) => {
  return <div className={`relative overflow-auto ${className}`} {...props} />;
};

// Custom utility components
export const EmptyState = ({ icon: Icon, title, description }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <Icon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium text-gray-600">{title}</p>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export const ScoreIndicator = ({ score, label, className }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex justify-between mb-2">
        <span className="font-medium">{label}</span>
        <span className="font-medium">{score.toFixed(1)}/10</span>
      </div>
      <Progress value={score * 10} />
    </div>
  );
};
