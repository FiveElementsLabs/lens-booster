# LensBooster

Boost your content and skyrocket your audience.

## What is Lens Booster

Lens Booster is a web3 advertising protocol built on Lens. The idea behind Lens Booster is to disintermediate advertising by creating a market between advertisers that want to promote contents and creators / users of Lens (inflensers) that can host the contents in their Lens profiles, visibile in various frontends (see Lenster.xyz).

## Who is Lens Booster for

Lens Booster is for users of Lens protocol and Lens applications such as Lenster.xyz

## How does Lens Booster work

### Advertisers

Advertisers can create sponsored campaigns by setting duration, budget and other parameters that control how the budget is distributed among Lens users.

### Inflensers

Users with Lens profile can post incentivized contents from the Lensbooster page to promote it to all their social media page.

### How the payoff is calculated

The payoff depends from a boost score taking into account profile popularity on Lens, clicks generated and on chain event generated in the advertiser dapp.

```
Payoff (usdc) = Boost score (floor) + CPClick _ clicks + CPAction _ on chain events
```

**Boost score:** A score calculated by Lensbooster which measures the popularity of profiles. In the first version of the product will be computed off chain with Lens profile activity metrics;

**CPClick:** The cost per click set by advertisers;

**Clicks:** Number of clicks to sponsor platform coming from shared post;

**CPAction:** The cost per on chain transaction coming from followers of profiles addresses, set by advertiser (can be 0). This is the equivalent of a referral fee for computing off chain actions.
