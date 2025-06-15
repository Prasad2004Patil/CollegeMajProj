
-- Phase 1: Backend Infrastructure Setup
-- Step 1: Database Design

-- Table to store e-commerce transactions
CREATE TABLE public.transactions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    amount numeric(10, 2) NOT NULL,
    currency character varying(3) NOT NULL,
    customer_id text,
    status text NOT NULL,
    payment_method text,
    location jsonb,
    is_anomaly boolean NOT NULL DEFAULT false,
    raw_data jsonb
);
COMMENT ON TABLE public.transactions IS 'Stores e-commerce transaction data.';

-- Table for security-related logs
CREATE TABLE public.security_logs (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    event_type text NOT NULL,
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    ip_address inet,
    details jsonb
);
COMMENT ON TABLE public.security_logs IS 'Stores security-related events like login attempts.';

-- Table for detected anomalies
CREATE TABLE public.anomalies (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    transaction_id uuid REFERENCES public.transactions(id) ON DELETE CASCADE,
    security_log_id uuid REFERENCES public.security_logs(id) ON DELETE CASCADE,
    anomaly_type text NOT NULL,
    risk_score integer,
    status text NOT NULL DEFAULT 'new',
    metadata jsonb,
    CONSTRAINT one_source_only CHECK (num_nonnulls(transaction_id, security_log_id) = 1)
);
COMMENT ON TABLE public.anomalies IS 'Stores detected security anomalies from transactions or logs.';

-- Table for connected data sources
CREATE TABLE public.data_sources (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    name text NOT NULL,
    type text NOT NULL,
    status text NOT NULL,
    last_synced_at timestamp with time zone
);
COMMENT ON TABLE public.data_sources IS 'Stores information about connected data sources like Shopify, Stripe, etc.';

-- Table to log actions of security admins in the dashboard
CREATE TABLE public.user_activity (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    admin_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    action text NOT NULL,
    details jsonb
);
COMMENT ON TABLE public.user_activity IS 'Logs actions performed by administrators in the dashboard.';


-- Enable Row Level Security (RLS) for all new tables
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anomalies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;


-- RLS Policies for transactions
CREATE POLICY "Allow all access to authenticated users on transactions"
ON public.transactions
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for security_logs
CREATE POLICY "Allow all access to authenticated users on security_logs"
ON public.security_logs
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for anomalies
CREATE POLICY "Allow all access to authenticated users on anomalies"
ON public.anomalies
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for data_sources
CREATE POLICY "Allow all access to authenticated users on data_sources"
ON public.data_sources
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for user_activity
CREATE POLICY "Users can manage their own activity"
ON public.user_activity
FOR ALL
USING (auth.uid() = admin_user_id)
WITH CHECK (auth.uid() = admin_user_id);
