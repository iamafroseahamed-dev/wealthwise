# Supabase Setup Guide

## Quick Setup Instructions

### Step 1: Create Tables in Supabase
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor**
4. Copy the entire content from `SUPABASE_TABLES.sql`
5. Paste and execute the SQL

### Step 2: Verify Tables Created
After execution, you should see these 6 tables:
- `blog_posts` - Articles for blog page
- `bookings` - Consultation bookings
- `client_records` - Client information & risk profiles
- `recommendations` - Logged MF recommendations
- `portfolio_reviews` - Portfolio review records
- `compliance_records` - Audit trail for compliance

---

## Tables Overview with Sample Data

### 1. Blog Posts
```
For publishing educational content about:
- Risk profiling
- SIP vs Lumpsum investment
- ELSS tax saving benefits
- General mutual fund education

Sample: 3 posts included in SQL
```

### 2. Bookings
```
Stores consultation booking requests
Status: pending → confirmed → completed

Columns:
- name (string)
- email (string)
- phone (string)
- booking_date (date)
- booking_time (string)
- investment_goal (string)
- message (optional)
- status (pending/confirmed/completed/cancelled)
- created_at (timestamp)
```

### 3. Client Records (⭐ Core Compliance Table)
```
Stores all client information with compliance records

Mandatory Fields Before Recommendation:
- name
- email
- risk_profile (conservative/moderate/aggressive)
- investment_horizon (short/medium/long-term)
- financial_goals (array)

Compliance Fields:
- risk_profile_date
- last_portfolio_review
- created_at

Key Rule: Risk profiling MANDATORY before any recommendation
```

### 4. Recommendations Log
```
Every recommendation must be logged here
This tracks: What was recommended, Why (suitability basis), When, To whom

Fields:
- client_id (reference to client_records)
- scheme_name
- scheme_category (SIP/Lumpsum/ELSS)
- investment_amount
- recommendation_basis (why this scheme fits their profile)
- suitability_assessed (MUST be true)
- transaction_executed (tracks if they invested)
- transaction_date

Compliance Note: This is your audit trail proving proper risk assessment
```

### 5. Portfolio Reviews
```
Track periodic portfolio review activities
Required for ongoing after-sales support

Fields:
- client_id
- review_date
- portfolio_value
- performance_summary
- suggested_changes
- alignment_with_goals (Aligned/Needs Rebalancing)
- next_review_date

Why: Demonstrates compliance with portfolio review obligations
```

### 6. Compliance Records
```
Complete audit trail for all compliance activities

Record Types:
- risk_profile - When risk profiling was done
- suitability_assessment - When suitability was assessed
- execution_only_consent - When client agreed to execution-only
- portfolio_review - When portfolio was reviewed
- other - Any other compliance event

All records include:
- compliance_date
- verified_by (ARN: 332207)
- document_content (what was done)
```

---

## Sample Data Included

The SQL includes sample data to help you test:

### Sample Clients
```
1. Rajesh Kumar (rajesh@example.com)
   - Risk Profile: Moderate
   - Goal: Retirement Planning
   - Monthly Investment: ₹15,000
   - Sample recommendation logged

2. Priya Singh (priya@example.com)
   - Risk Profile: Aggressive
   - Goal: Child Education & Wealth Creation
   - Monthly Investment: ₹20,000
```

### Sample Blog Posts
```
1. Risk Profiling in Mutual Funds (5 min read)
2. SIP vs Lumpsum (7 min read)
3. ELSS Tax Saving (6 min read)
```

### Sample Bookings
```
1. Rajesh Kumar - 2026-03-15 at 10:00 AM (confirmed)
2. Priya Singh - 2026-03-20 at 02:00 PM (pending)
```

---

## Integration with Website

### To Display Blog Posts:
```javascript
// In Blog.tsx
const { data } = await supabase
  .from('blog_posts')
  .select('*')
  .order('published_at', { ascending: false });
```

### To Save Bookings:
```javascript
// In BookSession.tsx
const { data, error } = await supabase
  .from('bookings')
  .insert([{
    name,
    email,
    phone,
    booking_date: date,
    booking_time: timeSlot,
    investment_goal: selectedGoal
  }]);
```

### To Log a Recommendation:
```javascript
// After assessing client and recommending a fund
const { data } = await supabase
  .from('recommendations')
  .insert([{
    client_id: clientUUID,
    scheme_name: 'Balanced Fund',
    scheme_category: 'SIP',
    investment_amount: 15000,
    recommendation_basis: 'Moderate risk profile, 25-year horizon, goal-based investing'
  }]);
```

### To Add to Compliance Records:
```javascript
// After any compliance activity
const { data } = await supabase
  .from('compliance_records')
  .insert([{
    client_id: clientUUID,
    record_type: 'risk_profile',
    document_content: 'Risk profile assessment completed, profile: moderate',
    compliance_date: new Date()
  }]);
```

---

## Views Setup

The SQL creates 3 helpful views:

### 1. client_summary
Shows:
- Client name & email
- Risk profile
- Total recommendations
- Executed recommendations
- Last review date
- Portfolio value

**Use:** Admin dashboard, client overview

### 2. recent_bookings
Shows: Upcoming consultation bookings by date/time

**Use:** Consultation scheduler, upcoming bookings view

### 3. compliance_audit_trail
Shows: Every compliance activity with dates

**Use:** Compliance audit, regulatory reporting

---

## Row Level Security (RLS)

RLS policies are created for data security. They currently allow all access for testing.

**To enable proper authentication:**

1. Set up Supabase Auth in your app
2. Update each RLS policy with:
```sql
-- Example: Only users can see their own bookings
CREATE POLICY "Users see own bookings" ON bookings
  FOR SELECT
  USING (email = auth.jwt() ->> 'email');
```

---

## Key Compliance Features in Database

### ✅ Risk Profiling Requirement
- `client_records.risk_profile` is mandatory
- `client_records.risk_profile_date` timestamps when profiling done
- Prevents recommendations without profiling

### ✅ Suitability Assessment
- `recommendations.suitability_assessed` must be true
- `recommendations.recommendation_basis` documents why scheme is suitable
- Audit trail for regulatory compliance

### ✅ Portfolio Review Tracking
- `portfolio_reviews` table tracks all reviews
- `client_records.last_portfolio_review` shows when last reviewed
- `portfolio_reviews.next_review_date` schedules upcoming reviews

### ✅ Execution-Only Transactions
- `compliance_records` with type='execution_only_consent'
- Documents when client chose execution-only option
- Maintains proper separation from advisory relationships

### ✅ Complete Audit Trail
- `compliance_records` tracks all compliance activities
- Timestamped and verified by ARN
- Ready for regulatory inspection

---

## Testing the Setup

### 1. Insert a Test Booking:
```sql
INSERT INTO bookings (name, email, phone, booking_date, booking_time, investment_goal, status)
VALUES ('Test User', 'test@example.com', '+91 99999 99999', '2026-03-25', '11:00 AM', 'Retirement', 'pending');
```

### 2. View All Bookings:
```sql
SELECT * FROM recent_bookings;
```

### 3. Check Compliance Records:
```sql
SELECT * FROM compliance_audit_trail ORDER BY compliance_date DESC;
```

### 4. View Client Summary:
```sql
SELECT * FROM client_summary;
```

---

## Important Notes

### 🔐 Security
- Enable RLS before going to production
- Set up proper authentication
- Backup regularly
- Monitor access logs

### 📋 Compliance
- Every client interaction should create a compliance record
- Risk profiling is mandatory before recommendations
- Keep recommendation_basis detailed for audit purposes
- Schedule and track portfolio reviews

### 🔄 Data Retention
- Maintain records for minimum 5 years (per SEBI guidelines)
- Keep compliance_records indefinitely
- Regular backup to secure location

### 👤 Personal Data
- GDPR compliant (if EU users)
- Delete only on explicit client request
- Maintain audit trail of deletions

---

## Troubleshooting

### Tables not appearing:
- Check SQL for syntax errors
- Verify project is selected
- Check Supabase quota

### RLS blocking access:
- Temporarily disable for testing: `ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;`
- Update policies with proper auth checks

### Sample data not showing:
- Refresh Supabase dashboard
- Check for constraint violations
- Verify foreign key relationships

---

## Next Steps

1. ✅ Run the SQL script
2. ✅ Verify tables in dashboard  
3. ☐ Test with sample data
4. ☐ Connect to React components
5. ☐ Set up Supabase environment variables
6. ☐ Implement authentication
7. ☐ Create admin dashboard for compliance records

---

**Setup Completed!** Your database is now compliance-ready for AMFI regulations.

Questions? Review the `COMPLIANCE_IMPLEMENTATION_REPORT.md` for detailed changes.
