declare module "react-spark-scroll" {
  import * as React from "react";

  type Timeline = Record<string, any>;

  interface SparkScrollProps {
    proxy?: string;
    timeline?: Timeline;
    callback?: (ratio: number) => void;
    className?: string;
    children?: React.ReactNode;
  }

  type SparkScrollType = {
    div: React.FC<SparkScrollProps>;
    span: React.FC<SparkScrollProps>;
    h1: React.FC<SparkScrollProps>;
    h2: React.FC<SparkScrollProps>;
    h3: React.FC<SparkScrollProps>;
    section: React.FC<SparkScrollProps>;
    [key: string]: React.FC<SparkScrollProps>;
  };

  export const SparkScroll: SparkScrollType;

  interface SparkProxyDivProps {
    proxyId: string;
    className?: string;
    children?: React.ReactNode;
  }

  export const SparkProxy: {
    div: React.FC<SparkProxyDivProps>;
    [key: string]: any;
  };
}
