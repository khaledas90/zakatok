'use server';

import { revalidateTag } from 'next/cache';

export const resetServerCache = async () => {
  revalidateTag('ALL');
};
