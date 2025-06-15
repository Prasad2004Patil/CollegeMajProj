
-- Add a column to store file metadata
ALTER TABLE public.data_sources
ADD COLUMN file_metadata jsonb;

-- Create a storage bucket for data source files
INSERT INTO storage.buckets (id, name, public)
VALUES ('data_source_files', 'data_source_files', true);

-- The policies below allow public access.
-- This is for demonstration purposes and should be secured with user authentication.

-- Allow public read access to files in the new bucket
CREATE POLICY "Public read access for data_source_files" 
ON storage.objects FOR SELECT USING (bucket_id = 'data_source_files');

-- Allow anyone to upload files to the new bucket
CREATE POLICY "Anyone can upload to data_source_files" 
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'data_source_files');
