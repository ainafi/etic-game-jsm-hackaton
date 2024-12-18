import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="p-1">
      <Card className="bg-transparent border-none">
        <CardContent className="flex items-center justify-center p-6 aspect-square">
          <div className="w-full h-full bg-gray-300 animate-pulse rounded-md"></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkeletonCard;
