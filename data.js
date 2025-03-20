// Define the data as a global variable
const data = {
  "virtues": {
    "honesty": { "name": "Honesty" },
    "authenticity": { "name": "Authenticity" },
    "selfRespect": { "name": "Self Respect" },
    "humility": { "name": "Humility" },
    "selfCompassion": { "name": "Self Compassion" },
    "compassion": { "name": "Compassion" },
    "perspective": { "name": "Perspective" },
    "acceptance": { "name": "Acceptance" },
    "patience": { "name": "Patience" },
    "presence": { "name": "Presence" },
    "courage": { "name": "Courage" },
    "resilience": { "name": "Resilience" },
    "focus": { "name": "Focus" },
    "discipline": { "name": "Discipline" },
    "discernment": { "name": "Discernment" },
    "curiosity": { "name": "Curiosity" },
    "gratitude": { "name": "Gratitude" },
    "temperance": { "name": "Temperance" }
  },
  "prompts": {
    "honesty": [
      "Own up to a mistake, big or small. A simple 'I was wrong' can be powerful.",
      "If asked something you don't know, say, 'I'm not sure, but I can find out.'",
      "Reflect on a potential blind spot. What part of life do you tend to avoid thinking about?",
      "Don't tell yourself you're not ok if you're not ok."
    ],
    "authenticity": [
      "Share a true opinion with someone you trust today, even if it's a little uncomfortable.",
      "Tell someone one thing you genuinely appreciate about them.",
      "Do something that makes you truly happy, even if you think it's weird.",
      "It's okay if being yourself feels hard. It's still worth it."
    ],
    "selfRespect": [
      "Say 'no' to one request that feels draining or unimportant.",
      "Take a 5-minute break without apologizing for it.",
      "Name one personal strength out loud. Own it.",
      "Remind yourself that your needs are important too.",
      "Feeling overwhelmed by others' needs? It's okay to set a small boundary."
    ],
    "humility": [
      "Ask for help with one specific task, even if it's small.",
      "Approach a conversation with the mindset, 'I have something to learn here.'",
      "Instead of offering advice, ask 'What do you think is the best approach?'",
      "Consider an opinion you have and ask yourself 'What if I'm wrong?'",
      "It's okay to feel proud of your accomplishments. Acknowledge someone who helped you."
    ],
    "selfCompassion": [
      "If you catch yourself being self-critical, say something positive about yourself instead.",
      "Name one thing you like about yourself. It can be anything.",
      "Forgive yourself for one specific thing you're holding onto.",
      "Do one small act of self-care like a short walk, a deep breath or even a cup of tea.",
      "Imagine your future self. What kind words would they offer you now?"
    ],
    "compassion": [
      "Perform one random act of kindness. Let it be a surprise.",
      "Offer a compliment that goes beyond appearance, like 'I admire your creativity.'",
      "Listen to someone for 5 minutes without interrupting. Just hear them.",
      "Offer help before being asked. Look for opportunities.",
      "Celebrate someone else's win as if it were your own.",
      "Catch yourself gossiping? Turn it around with a genuine compliment to or about someone.",
      "Recognize a situation where you were hard on yourself, and consider how you would advise a friend in the same situation."
    ],
    "perspective": [
      "During a conversation, ask a clarifying question like 'What do you mean by that?' or 'Can you tell me more about that?'",
      "Before reacting to an opinion you disagree with, try saying, 'Help me understand your perspective.'",
      "Consider a problem from the viewpoint of someone you respect, even if you disagree with them.",
      "Spend 5 minutes reading or listening to a viewpoint opposite to your own.",
      "Imagine your future self. What one piece of advice would they give you now?",
      "Challenge one assumption you hold. Ask yourself, 'Is this really always true?'"
    ],
    "acceptance": [
      "Choose one thing you can't control today and say, 'I'll let this go.'",
      "Feel an emotion fully, without trying to change it. Just observe it.",
      "Acknowledge one personal limitation and say, 'This is part of who I am, and that's okay.'",
      "Acknowledge one personal limitation and consider how you can work with it, rather than against it.",
      "Accept one imperfection in your surroundings without trying to fix it."
    ],
    "patience": [
      "When you feel anger rising in conversation, take a deep breath before responding.",
      "Turn a waiting period like traffic or a download into a mini-meditation. Focus on your breath.",
      "Choose one small task that usually frustrates you and do it slowly and deliberately.",
      "Before replying to a frustrating message, wait one full minute. Let yourself cool down.",
      "Set a timer for 3 minutes and just observe your surroundings without judgement."
    ],
    "presence": [
      "Set a 'presence alarm' on your phone. When it rings, stop and notice: What do you see, hear, smell, feel?",
      "Eat one meal or snack without any distractions. Focus on the taste and texture.",
      "Spend 5 minutes watching a natural element like the sky, a tree, or water without thinking about anything else.",
      "Walk slowly for a few minutes, feeling each step. Notice the ground beneath you.",
      "It's okay to feel like slowing down. Settle into one nice moment."
    ],
    "courage": [
      "Do one small thing that scares you a little. It could be tiny. And acknowledge your bravery afterwards.",
      "Say 'yes' to something you'd usually avoid out of fear or discomfort.",
      "Ask a question you've been hesitant to ask.",
      "Share a vulnerability with someone you trust, even if it's just a small worry.",
      "Imagine your future self. What one small step would they tell you to take?"
    ],
    "resilience": [
      "Turn one complaint into a positive action, no matter how small.",
      "When something goes wrong, ask, 'What's one thing I can learn from this?'",
      "Remember a past success. What one strength helped you achieve it?",
      "Think of a challenge you've overcome. Remind yourself: 'I did it before, I can do it again.'",
      "Do one thing to actively recharge. Walk in nature, exercise, meditate or talk to a friend.",
      "Acknowledge a recent setback without judgment. It's okay to feel disappointed."
    ],
    "focus": [
      "For one hour, silence all non-essential notifications.",
      "Turn off your phone completely during a meal.",
      "Before starting a task, close your eyes and visualize one step you'll take.",
      "Write down one goal for the day. Keep it visible.",
      "Choose one object and study it intensely for 5 minutes, noticing every detail.",
      "Feeling distracted? It's okay. Just gently bring your attention back."
    ],
    "discipline": [
      "Choose one small habit and commit to it for one week. Consistency is key.",
      "Finish one task completely before starting another, even if it's unpleasant.",
      "Do one thing you've been putting off, right now.",
      "Reward yourself only after completing a chosen task. No cheating!",
      "Imagine your successful future self. What one habit would they tell you to keep?"
    ],
    "discernment": [
      "Before believing a news story, ask, 'Who benefits from me believing this?'",
      "Identify one recurring problem in your life. Ask, 'What's one small step I can take to address it?'",
      "Before sharing anything online, pause and ask, 'Is this helpful, true, or kind?'",
      "When feeling a strong emotion, ask yourself, 'What triggered this, and does my reaction make sense?'",
      "Before making a decision, ask, 'What if I'm wrong about this?'"
    ],
    "curiosity": [
      "Ask one 'why' question today about something you usually take for granted.",
      "Start a conversation with someone you don't know well. Ask them about their interests.",
      "Spend 10 minutes exploring a topic you know nothing about. Use a book or search online.",
      "Try one new thing today, no matter how small. It could be a new food or a different route than usual.",
      "Look around your current environment and find something you've never noticed before.",
      "Try to figure out where a word came from, then look up its real roots."
    ],
    "gratitude": [
      "Before sleep, name three good things that happened today, big or small.",
      "Send a one-sentence thank-you to someone. A text is good enough!",
      "Appreciate one quality in someone you often overlook. Tell them.",
      "Notice one simple pleasure that you usually take for granted and savor it.",
      "Mentally thank someone, from the past, who made a positive impact on your life.",
      "It's okay if you're not feeling grateful today. Notice one small thing you don't dislike."
    ],
    "temperance": [
      "When a craving hits, wait five minutes. Do something else. Then re-evaluate.",
      "Eat one meal mindfully, paying attention to each bite.",
      "Put away any device one hour before you go to sleep",
      "Set one small limit on something you tend to overdo like screen time or spending and stick to it."
    ]
  },
  "problems": {
    "futureUncertainty": {
        "problem": "Directionless / I'm floating in life",
        "virtueScores": {
            "courage": 3,
            "acceptance": 3,
            "perspective": 3,
            "patience": 1,
            "focus": 1,
            "curiosity": 1,
            "discernment": 3,
            "honesty": 3
        }
    },
    "lackOfPurpose": {
        "problem": "Lack of Purpose / I'm lost",
        "virtueScores": {
            "honesty": 3,
            "curiosity": 3,
            "perspective": 3,
            "courage": 1,
            "focus": 1,
            "discernment": 3
        }
    },
    "lackOfSelfWorth": {
       "problem": "Self-Worth / I'm a nobody",
        "virtueScores": {
            "humility": 3,
            "authenticity": 3,
            "selfCompassion": 3,
            "gratitude": 1,
            "perspective": 1,
            "honesty": 3
        }
    },
    "indecisiveness": {
        "problem": "Indecisiveness / Choices are hard",
        "virtueScores": {
            "focus": 3,
            "honesty": 3,
            "courage": 3,
            "acceptance": 1,
            "perspective": 1,
            "discernment": 3
        }
    },
	"lowSelfEsteem": {
  		"problem": "Low Self-Esteem / I don't like myself",
  		"virtueScores": {
    		"selfCompassion": 3,
    		"honesty": 3,
    		"humility": 3,
    		"gratitude": 1,
    		"perspective": 1,
    		"compassion": 1
  		}
	},
	"difficultySettingBoundaries": {
  		"problem": "Setting Boundaries / People pleasing",
  		"virtueScores": {
    		"selfRespect": 3,
    		"honesty": 3,
    		"authenticity": 3,
    		"courage": 3,
    		"selfCompassion": 1,
    		"perspective": 1
  }
},
"emotionalReactivity": {
  "problem": "Emotional Reactivity / I act without thinking",
  "virtueScores": {
    "patience": 3,
    "presence": 3,
    "compassion": 3,
    "perspective": 3,
    "humility": 1,
    "acceptance": 1
  }
},
"relationshipConflict": {
  "problem": "Relationship Conflict / I fight a lot",
  "virtueScores": {
    "compassion": 3,
    "honesty": 3,
    "humility": 3,
    "patience": 3,
    "selfRespect": 1,
    "perspective": 1
  }
},
"fearOfFailure":  {
  "problem": "Fear of Failure / I don't try new things",
  "virtueScores": {
    "courage": 3,
    "humility": 3,
    "acceptance": 3,
    "perspective": 1,
    "resilience": 1,
    "curiosity": 3
  }
},
"perfectionism": {
  "problem": "Perfectionism / I'm not good enough",
  "virtueScores": {
    "humility": 3,
    "selfCompassion": 3,
    "acceptance": 3,
    "resilience": 3,
    "courage": 1,
    "gratitude": 3
  }
},
"socialAnxiety": {
  "problem": "Social Anxiety / I'm awkward",
  "virtueScores": {
    "courage": 3,
    "authenticity": 3,
    "acceptance": 3,
    "humility": 1,
    "compassion": 1,
    "presence": 3
  }
},
"comparison": {
  "problem": "Comparison / I feeling bad about myself online",
  "virtueScores": {
    "gratitude": 3,
    "humility": 3,
    "authenticity": 3,
    "perspective": 1,
    "selfRespect": 1,
    "selfCompassion": 1
  }
},
"procrastination":  {
  "problem": "Procrastination / I keep putting things off",
  "virtueScores": {
    "discipline": 3,
    "focus": 3,
    "resilience": 1,
    "patience": 1,
    "honesty": 3,
    "discernment": 1
  }
},
"overwhelm":  {
  "problem": "Overwhelm / I'm stressed out",
  "virtueScores": {
    "focus": 3,
    "discipline": 3,
    "acceptance": 1,
    "patience": 1,
    "perspective": 1,
    "discernment": 3
  }
},
"unhealthyHabits": {
  "problem": "Unhealthy Habits / Bad habits",
  "virtueScores": {
    "discipline": 3,
    "honesty": 3,
    "temperance": 3,
    "selfCompassion": 1,
    "perspective": 1,
    "patience": 1,
    "resilience": 1
  }
},
"difficultyCommitting": {
  "problem": "Committing / Commitment issues",
  "virtueScores": {
    "courage": 3,
    "honesty": 3,
    "discipline": 1,
    "focus": 1,
    "patience": 1,
    "perspective": 1
  }
},
"lackOfSelfCare":  {
  "problem": "Self-Care / Burnout",
  "virtueScores": {
    "selfCompassion": 3,
    "selfRespect": 3,
    "perspective": 3,
    "temperance": 3,
    "honesty": 3,
    "patience": 1
  }
},
"difficultyAcceptingPraise": {
  "problem": "Accepting Praise / I don't like compliments",
  "virtueScores": {
    "humility": 3,
    "gratitude": 3,
    "honesty": 1,
    "selfCompassion": 1,
    "compassion": 1,
    "perspective": 1
  }
},
"loneliness": {
  "problem": "Loneliness / I'm lonely",
  "virtueScores": {
    "compassion": 3,
    "courage": 3,
    "authenticity": 1,
    "humility": 1,
    "perspective": 1
    }
  }
}
};