
-- Drop existing RLS policies that require authentication
DROP POLICY IF EXISTS "Allow all access to authenticated users on transactions" ON public.transactions;
DROP POLICY IF EXISTS "Allow all access to authenticated users on security_logs" ON public.security_logs;
DROP POLICY IF EXISTS "Allow all access to authenticated users on anomalies" ON public.anomalies;
DROP POLICY IF EXISTS "Allow all access to authenticated users on data_sources" ON public.data_sources;
DROP POLICY IF EXISTS "Users can manage their own activity" ON public.user_activity;

-- Create new RLS policies for public access
CREATE POLICY "Allow public access on transactions" ON public.transactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access on security_logs" ON public.security_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access on anomalies" ON public.anomalies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access on data_sources" ON public.data_sources FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access on user_activity" ON public.user_activity FOR ALL USING (true) WITH CHECK (true);
