# AdSense Setup Guide

## Overview

Your pickleball blog is now AdSense-ready with all required pages and ad placements configured.

## What's Been Added

### 1. Required Pages ✅

- **Privacy Policy** (`privacy.html`) - Comprehensive privacy policy including AdSense disclosure
- **About Page** (`about.html`) - Professional about page showcasing your blog's mission
- **Contact Page** (`contact.html`) - Contact form and multiple contact methods

### 2. AdSense Placeholders ✅

Ad placement zones have been added to `index.html`:

- **Top Banner** (after hero section) - 728x90 or responsive
- **Sidebar Ad** (after newsletter) - 300x250 or responsive

### 3. SEO Optimization ✅

- Added meta description to homepage
- Updated navigation with new pages
- Footer links to Privacy Policy
- Professional page structure

## How to Apply for AdSense

### Step 1: Build Content

Before applying, ensure you have:
- ✅ At least 20-30 quality articles (use your automation!)
- ✅ Regular posting schedule (your GitHub Actions handles this)
- ✅ Original, valuable content

### Step 2: Apply for AdSense

1. Go to [Google AdSense](https://www.google.com/adsense)
2. Click "Get Started"
3. Enter your website URL: `https://YOUR-USERNAME.github.io/pickleball-blog`
4. Fill out the application form
5. Add the AdSense code to your site (see below)

### Step 3: Add AdSense Code

Once approved, you'll receive:
1. **Publisher ID** (looks like `ca-pub-1234567890123456`)
2. **Ad unit codes** for each placement

#### Update Your Site

**1. Uncomment the AdSense script in `index.html` head:**

```html
<!-- Find this in index.html around line 10-11 -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_ID"
     crossorigin="anonymous"></script>
```

Replace `YOUR_ADSENSE_ID` with your actual publisher ID.

**2. Replace ad placeholders with actual AdSense code:**

Find the placeholder divs (marked with `[AdSense Top Banner]` and `[AdSense Sidebar]`) and replace them with your actual AdSense code from Google.

Example AdSense code:
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-YOUR_ADSENSE_ID"
     data-ad-slot="1234567890"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

## Ad Placement Locations

### Current Placements

1. **Top Banner** - Below hero section, above articles
   - Best for: 728x90 leaderboard or responsive
   - High visibility, good CTR

2. **Sidebar** - After newsletter section
   - Best for: 300x250 medium rectangle
   - Non-intrusive, good for engagement

### Recommended Additional Placements

Consider adding these after approval:

3. **In-Feed Ads** - Between article cards
4. **Article Bottom** - End of article view
5. **Tournament Page** - In tournament listings

## Tips for AdSense Success

### Content Strategy

- ✅ **Post regularly** - Your automation handles this!
- ✅ **Quality over quantity** - Focus on valuable content
- ✅ **Long-form articles** - Aim for 500+ words
- ✅ **Engaging topics** - Tournament recaps, player profiles, tips

### Traffic Building

- Share on social media (Reddit, Facebook pickleball groups)
- Engage with pickleball communities
- SEO optimization (keywords, meta descriptions)
- Cross-link between articles

### AdSense Best Practices

- ✅ **Don't click your own ads** - This will get you banned
- ✅ **Don't ask users to click ads** - Against AdSense policies
- ✅ **Keep content family-friendly** - Required for AdSense
- ✅ **Mobile-friendly design** - Your site already is!
- ✅ **Fast loading times** - Static site = fast!

## Approval Timeline

- **Application review**: 1-2 weeks
- **First payment threshold**: $100
- **Payment schedule**: Monthly

## Troubleshooting

### Application Rejected?

Common reasons:
- Insufficient content (add more articles)
- Low-quality content (improve article depth)
- Site too new (wait 6 months, keep posting)
- Traffic too low (build audience first)

### Ads Not Showing?

- Check if AdSense code is correct
- Verify publisher ID is accurate
- Wait 24-48 hours after adding code
- Check browser console for errors

## Estimated Earnings

Pickleball niche earnings (estimates):
- **RPM**: $2-8 per 1000 pageviews
- **CTR**: 1-3% average
- **1000 daily visitors**: $60-240/month
- **5000 daily visitors**: $300-1200/month

## Next Steps

1. ✅ **Build content** - Use automation to generate 20-30 articles
2. ✅ **Deploy to GitHub Pages** - Follow DEPLOY.md
3. ✅ **Drive traffic** - Share in pickleball communities
4. ✅ **Apply for AdSense** - Once you have sufficient content
5. ✅ **Add AdSense code** - After approval
6. ✅ **Monitor performance** - Track earnings and optimize

## Resources

- [Google AdSense Help](https://support.google.com/adsense)
- [AdSense Program Policies](https://support.google.com/adsense/answer/48182)
- [AdSense Payment Guide](https://support.google.com/adsense/answer/1714364)

---

Your site is now fully AdSense-ready! Focus on building great content and driving traffic. 💰
