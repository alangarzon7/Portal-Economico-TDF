-- 1. ENUMS Y ROLES
CREATE TYPE user_role AS ENUM ('reader', 'researcher', 'verified_economist');
CREATE TYPE post_category AS ENUM ('macroeconomia', 'finanzas_publicas', 'empleo_salarios', 'comercio_industria', 'comunidad_opinion');
CREATE TYPE verification_level AS ENUM ('unverified', 'community_reviewed', 'verified_specialist');
CREATE TYPE report_quality_badge AS ENUM ('gold_excellence', 'silver_featured', 'bronze_technical');

-- 2. TABLA DE PERFILES
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'reader',
  institution TEXT,
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. INDICADORES
CREATE TABLE public.indicators (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  unit TEXT NOT NULL,
  category TEXT NOT NULL,
  source TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. VALORES DE SERIES TEMPORALES
CREATE TABLE public.indicator_values (
  id BIGSERIAL PRIMARY KEY,
  indicator_code TEXT REFERENCES public.indicators(code) ON DELETE CASCADE,
  date DATE NOT NULL,
  value_regional NUMERIC(12, 2) NOT NULL,
  value_national NUMERIC(12, 2),
  change_monthly NUMERIC(6, 2),
  change_interannual NUMERIC(6, 2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_indicator_date UNIQUE(indicator_code, date)
);

-- 5. PUBLICACIONES E INFORMES
CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  category post_category NOT NULL,
  verification_level verification_level NOT NULL DEFAULT 'unverified',
  quality_badge report_quality_badge DEFAULT NULL,
  is_formal_report BOOLEAN DEFAULT FALSE,
  dataset_url TEXT,
  views_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public posts read" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
