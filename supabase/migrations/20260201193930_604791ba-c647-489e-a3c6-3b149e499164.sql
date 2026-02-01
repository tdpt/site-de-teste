-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-images', 
  'portfolio-images', 
  true,
  1048576, -- 1MB in bytes
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Allow anyone to view portfolio images (public bucket)
CREATE POLICY "Portfolio images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'portfolio-images');

-- Allow admins to upload portfolio images
CREATE POLICY "Admins can upload portfolio images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio-images' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to update portfolio images
CREATE POLICY "Admins can update portfolio images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'portfolio-images' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to delete portfolio images
CREATE POLICY "Admins can delete portfolio images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'portfolio-images' 
  AND public.has_role(auth.uid(), 'admin')
);