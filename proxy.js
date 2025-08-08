// proxy.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 替换为你的 DeepSeek API Key
const API_KEY = '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';

// 模拟 AI 响应数据
function getMockResponse(task, refresh = false) {
  const mockResponses = {
    // 中文任务
    '学习英语': {
      choices: [{
        message: {
          content: `First two actionable suggestions:
1. Start with basic vocabulary and daily phrases
2. Practice speaking with language exchange apps

Full task outline:
1. Set clear learning goals and timeline
2. Choose a learning method (apps, courses, or tutors)
3. Build basic vocabulary (500-1000 words)
4. Practice pronunciation and listening
5. Start simple conversations
6. Join English speaking communities
7. Take practice tests and assessments
8. Immerse in English media (movies, books, podcasts)`
        }
      }]
    },
    '健身': {
      choices: [{
        message: {
          content: `First two actionable suggestions:
1. Start with basic bodyweight exercises
2. Create a simple workout schedule

Full task outline:
1. Assess your current fitness level
2. Set specific fitness goals
3. Choose workout types (strength, cardio, flexibility)
4. Create a weekly exercise schedule
5. Start with beginner-friendly exercises
6. Track your progress and measurements
7. Adjust your routine based on results
8. Consider joining a gym or hiring a trainer`
        }
      }]
    },
    '写报告': {
      choices: [{
        message: {
          content: `First two actionable suggestions:
1. Research and gather relevant information
2. Create a detailed outline structure

Full task outline:
1. Understand the report requirements and audience
2. Research and collect necessary data
3. Create a comprehensive outline
4. Write the introduction and background
5. Develop the main content sections
6. Include data analysis and findings
7. Write conclusions and recommendations
8. Review, edit, and format the report`
        }
      }]
    },
    // 英文任务
    'Fitness': [
      {
        choices: [{
          message: {
            content: `First two actionable suggestions:
1. Start with basic bodyweight exercises
2. Create a simple workout schedule

Full task outline:
1. Assess your current fitness level
2. Set specific fitness goals
3. Choose workout types (strength, cardio, flexibility)
4. Create a weekly exercise schedule
5. Start with beginner-friendly exercises
6. Track your progress and measurements
7. Adjust your routine based on results
8. Consider joining a gym or hiring a trainer`
          }
        }]
      },
      {
        choices: [{
          message: {
            content: `First two actionable suggestions:
1. Begin with 10-minute daily walks
2. Set up a home workout space

Full task outline:
1. Start with light cardio activities
2. Establish a consistent daily routine
3. Incorporate stretching and flexibility
4. Gradually increase workout intensity
5. Focus on proper form and technique
6. Monitor your energy levels
7. Stay hydrated and eat well
8. Build sustainable habits`
          }
        }]
      },
      {
        choices: [{
          message: {
            content: `First two actionable suggestions:
1. Download a fitness tracking app
2. Join an online fitness community

Full task outline:
1. Choose a fitness app that suits your goals
2. Set up your profile and preferences
3. Start with beginner-friendly workouts
4. Connect with like-minded people
5. Track your daily activities
6. Celebrate small achievements
7. Stay motivated with challenges
8. Build a supportive network`
          }
        }]
      }
    ],
    'Write a report': {
      choices: [{
        message: {
          content: `First two actionable suggestions:
1. Research and gather relevant information
2. Create a detailed outline structure

Full task outline:
1. Understand the report requirements and audience
2. Research and collect necessary data
3. Create a comprehensive outline
4. Write the introduction and background
5. Develop the main content sections
6. Include data analysis and findings
7. Write conclusions and recommendations
8. Review, edit, and format the report`
        }
      }]
    },
    'Learn a language': {
      choices: [{
        message: {
          content: `First two actionable suggestions:
1. Start with basic vocabulary and daily phrases
2. Practice speaking with language exchange apps

Full task outline:
1. Set clear learning goals and timeline
2. Choose a learning method (apps, courses, or tutors)
3. Build basic vocabulary (500-1000 words)
4. Practice pronunciation and listening
5. Start simple conversations
6. Join language speaking communities
7. Take practice tests and assessments
8. Immerse in target language media (movies, books, podcasts)`
        }
      }]
    }
  };
  
  const taskData = mockResponses[task];
  
  // 如果任务有多个选项，随机选择一个
  if (Array.isArray(taskData)) {
    const randomIndex = Math.floor(Math.random() * taskData.length);
    return taskData[randomIndex];
  }
  
  // 如果任务只有一个选项，直接返回
  if (taskData) {
    return taskData;
  }
  
  // 默认返回通用选项
  return {
    choices: [{
      message: {
        content: `First two actionable suggestions:
1. Break down the task into smaller steps
2. Start with the most important action

Full task outline:
1. Define clear objectives for your task
2. Research and gather necessary resources
3. Create a step-by-step action plan
4. Set realistic deadlines for each step
5. Begin with the first actionable item
6. Monitor progress and adjust as needed
7. Complete and review your work
8. Celebrate your achievements`
      }
    }]
  };
}

app.post('/api/ai', async (req, res) => {
  try {
    const { userTask, refresh = false } = req.body;
    
    if (!userTask) {
      return res.status(400).json({ error: 'Task is required' });
    }

    console.log('收到任务请求:', userTask);
    console.log('换一批请求:', refresh);

    // 尝试调用真实 AI API
    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'deepseek/deepseek-chat-v3-0324:free',
          messages: [
            { 
              role: 'system', 
              content: 'You are a helpful assistant. Help break down user tasks into actionable steps. Return the response in this format:\n\nFirst two actionable suggestions:\n1. [First suggestion]\n2. [Second suggestion]\n\nFull task outline:\n1. [Step 1]\n2. [Step 2]\n3. [Step 3]\n...' 
            },
            { role: 'user', content: userTask }
          ],
          stream: false,
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY.trim()}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:3001',
            'X-Title': 'SmartStarter'
          }
        }
      );

      console.log('✅ AI 响应成功 (真实 API)');
      res.json(response.data);
    } catch (apiError) {
      console.log('❌ 真实 API 调用失败，使用模拟数据:', apiError.message);
      console.log('💡 提示：请检查 API Key 余额或充值账户');
      
      // 使用模拟数据作为 fallback
      const mockData = getMockResponse(userTask, refresh);
      console.log('✅ 返回模拟数据');
      
      // 添加模拟数据标识
      mockData.isMockData = true;
      res.json(mockData);
    }
  } catch (err) {
    console.error('服务器错误:', err.message);
    res.status(500).json({ 
      error: 'Server error', 
      details: err.message 
    });
  }
});

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Proxy server is running' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`代理服务器运行在 http://localhost:${PORT}`);
  console.log('💡 提示：如果 API 余额不足，将使用模拟数据');
});