\echo 'Delete and recreate rmd db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE rmd
CREATE DATABASE rmd
\connect rmd

\i websiteData.sql

\echo 'Delete and recreate rmd_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE rmd_test
CREATE DATABASE rmd_test
\connect rmd_test
