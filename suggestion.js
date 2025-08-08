// 建议页交互逻辑
window.onload = function() {
  // 读取任务
  const task = localStorage.getItem('currentTask') || '';
  if (!task) return;
  
  // show loading indicator
  const loadingIndicator = document.getElementById('loadingIndicator');
  if (loadingIndicator) loadingIndicator.style.display = 'flex';
  
  // 调用本地代理服务器获取 AI 建议
  callAIForSuggestions(task);
};

// AI call（through local proxy）
async function callAIForSuggestions(task) {
  try {
    console.log('seeking AI suggestions...');
    
    const response = await fetch(window.APP_CONFIG.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userTask: task })
    });
    
    if (response.ok) {
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      console.log('AI response:', content);
      
      // 隐藏加载状态
      const loadingIndicator = document.getElementById('loadingIndicator');
      if (loadingIndicator) loadingIndicator.style.display = 'none';
      
      // 检查是否为模拟数据
      const isMockData = data.isMockData || false;
      
      // Parse the content returned by AI
      const lines = content.split('\n').filter(line => line.trim());
      let firstSteps = [];
      let outline = [];
      
      // find the first two suggestions and the full outline
      let foundFirstSteps = false;
      let foundOutline = false;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.toLowerCase().includes('first two actionable suggestions')) {
          foundFirstSteps = true;
          continue;
        }
        
        if (line.toLowerCase().includes('full task outline')) {
          foundFirstSteps = false;
          foundOutline = true;
          continue;
        }
        
        if (foundFirstSteps && line.match(/^\d+\./)) {
          firstSteps.push(line.replace(/^\d+\.\s*/, ''));
          if (firstSteps.length >= 2) foundFirstSteps = false;
        }
        
        if (foundOutline && line.match(/^\d+\./)) {
          outline.push(line.replace(/^\d+\.\s*/, ''));
        }
      }
      
      // 如果没有解析到内容，使用默认格式
      if (firstSteps.length === 0) {
        firstSteps = lines.slice(0, 2);
        outline = lines.slice(2);
      }
      
      showSuggestions(firstSteps, outline, isMockData);
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('AI API 调用失败:', error);
    
    // 隐藏加载状态
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) loadingIndicator.style.display = 'none';
    
    // 使用更好的示例数据作为 fallback
    const task = localStorage.getItem('currentTask') || '';
    let firstSteps = [];
    let outline = [];
    
         // 根据任务类型提供不同的模拟数据
     const mockData = getMockDataForTask(task);
     firstSteps = mockData.firstSteps;
     outline = mockData.outline;
    
         showSuggestions(firstSteps, outline, true); // 模拟数据
   }
 }

// 获取模拟数据的函数
function getMockDataForTask(task) {
  const taskLower = task.toLowerCase();
  
  // 健身相关的多个选项
  if (taskLower.includes('fitness') || taskLower.includes('健身')) {
    const fitnessOptions = [
      {
        firstSteps: [
          "Start with basic bodyweight exercises",
          "Create a simple workout schedule"
        ],
        outline: [
          "Assess your current fitness level",
          "Set specific fitness goals", 
          "Choose workout types (strength, cardio, flexibility)",
          "Create a weekly exercise schedule",
          "Start with beginner-friendly exercises",
          "Track your progress and measurements",
          "Adjust your routine based on results",
          "Consider joining a gym or hiring a trainer"
        ]
      },
      {
        firstSteps: [
          "Begin with 10-minute daily walks",
          "Set up a home workout space"
        ],
        outline: [
          "Start with light cardio activities",
          "Establish a consistent daily routine",
          "Incorporate stretching and flexibility",
          "Gradually increase workout intensity",
          "Focus on proper form and technique",
          "Monitor your energy levels",
          "Stay hydrated and eat well",
          "Build sustainable habits"
        ]
      },
      {
        firstSteps: [
          "Download a fitness tracking app",
          "Join an online fitness community"
        ],
        outline: [
          "Choose a fitness app that suits your goals",
          "Set up your profile and preferences",
          "Start with beginner-friendly workouts",
          "Connect with like-minded people",
          "Track your daily activities",
          "Celebrate small achievements",
          "Stay motivated with challenges",
          "Build a supportive network"
        ]
      }
    ];
    return fitnessOptions[Math.floor(Math.random() * fitnessOptions.length)];
  }
  
  // 报告相关的多个选项
  else if (taskLower.includes('report') || taskLower.includes('报告')) {
    const reportOptions = [
      {
        firstSteps: [
          "Research and gather relevant information",
          "Create a detailed outline structure"
        ],
        outline: [
          "Understand the report requirements and audience",
          "Research and collect necessary data",
          "Create a comprehensive outline",
          "Write the introduction and background",
          "Develop the main content sections",
          "Include data analysis and findings",
          "Write conclusions and recommendations",
          "Review, edit, and format the report"
        ]
      },
      {
        firstSteps: [
          "Define the report scope and objectives",
          "Identify key stakeholders and their needs"
        ],
        outline: [
          "Clarify the purpose and goals of the report",
          "Identify target audience and their expectations",
          "Gather requirements from stakeholders",
          "Plan the report structure and timeline",
          "Collect and analyze relevant data",
          "Draft the initial content",
          "Review and incorporate feedback",
          "Finalize and distribute the report"
        ]
      },
      {
        firstSteps: [
          "Set up a project management system",
          "Create a research methodology"
        ],
        outline: [
          "Establish project timeline and milestones",
          "Define research questions and hypotheses",
          "Choose appropriate research methods",
          "Collect primary and secondary data",
          "Analyze findings and draw conclusions",
          "Present results in clear format",
          "Address potential limitations",
          "Recommend next steps"
        ]
      }
    ];
    return reportOptions[Math.floor(Math.random() * reportOptions.length)];
  }
  
  // 语言学习相关的多个选项
  else if (taskLower.includes('language') || taskLower.includes('英语')) {
    const languageOptions = [
      {
        firstSteps: [
          "Start with basic vocabulary and daily phrases",
          "Practice speaking with language exchange apps"
        ],
        outline: [
          "Set clear learning goals and timeline",
          "Choose a learning method (apps, courses, or tutors)",
          "Build basic vocabulary (500-1000 words)",
          "Practice pronunciation and listening",
          "Start simple conversations",
          "Join language speaking communities",
          "Take practice tests and assessments",
          "Immerse in target language media (movies, books, podcasts)"
        ]
      },
      {
        firstSteps: [
          "Choose a language learning app",
          "Set up daily study reminders"
        ],
        outline: [
          "Select the right learning platform for your needs",
          "Create a consistent daily study schedule",
          "Focus on high-frequency words first",
          "Practice with native speakers online",
          "Use spaced repetition techniques",
          "Track your learning progress",
          "Apply language in real situations",
          "Maintain motivation through rewards"
        ]
      },
      {
        firstSteps: [
          "Find a language exchange partner",
          "Create a personalized study plan"
        ],
        outline: [
          "Identify your learning style and preferences",
          "Set realistic short-term and long-term goals",
          "Find a compatible language partner",
          "Schedule regular conversation practice",
          "Use authentic materials (news, videos)",
          "Practice writing and grammar",
          "Take regular progress assessments",
          "Immerse yourself in the culture"
        ]
      }
    ];
    return languageOptions[Math.floor(Math.random() * languageOptions.length)];
  }
  
  // 通用选项
  else {
    const generalOptions = [
      {
        firstSteps: [
          "Break down the task into smaller steps",
          "Start with the most important action"
        ],
        outline: [
          "Define clear objectives for your task",
          "Research and gather necessary resources",
          "Create a step-by-step action plan",
          "Set realistic deadlines for each step",
          "Begin with the first actionable item",
          "Monitor progress and adjust as needed",
          "Complete and review your work",
          "Celebrate your achievements"
        ]
      },
      {
        firstSteps: [
          "Research best practices and examples",
          "Create a project timeline"
        ],
        outline: [
          "Understand the task requirements thoroughly",
          "Research similar projects and case studies",
          "Identify potential challenges and solutions",
          "Create a detailed project timeline",
          "Gather necessary tools and resources",
          "Start with a small pilot or prototype",
          "Iterate and improve based on feedback",
          "Document your process and results"
        ]
      },
      {
        firstSteps: [
          "Set up a workspace and organize tools",
          "Break the task into 3 main phases"
        ],
        outline: [
          "Prepare your physical and digital workspace",
          "Organize all necessary tools and materials",
          "Divide the project into logical phases",
          "Set specific goals for each phase",
          "Establish regular check-in points",
          "Adapt your approach as needed",
          "Complete each phase thoroughly",
          "Review and prepare for next steps"
        ]
      }
    ];
    return generalOptions[Math.floor(Math.random() * generalOptions.length)];
  }
}

function showSuggestions(firstSteps, outline, isMockData = false) {
  const cardsRow = document.getElementById('firstStepCards');
  const outlineBox = document.getElementById('outlineBox');
  const btnRow = document.getElementById('suggestionBtns');
  if (!cardsRow || !outlineBox || !btnRow) return;
  cardsRow.innerHTML = '';
  
  // 添加模拟数据提示
  let outlineContent = '<ol>' + outline.map(s => `<li>${s}</li>`).join('') + '</ol>';
  if (isMockData) {
    outlineContent = `
      <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 12px; margin-bottom: 16px; color: #856404; font-size: 0.9rem;">
        <strong>Demo Mode:</strong> This is simulated data for demonstration purposes. In production, this would be generated by AI.
      </div>
      ${outlineContent}
    `;
  }
  outlineBox.innerHTML = outlineContent;
  btnRow.classList.add('hidden');

  firstSteps.forEach((step, idx) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = step;
    card.onclick = () => {
      // 选中后只保留该卡片
      cardsRow.innerHTML = '';
      card.classList.add('selected');
      cardsRow.appendChild(card);
      btnRow.classList.remove('hidden');
    };
    cardsRow.appendChild(card);
  });

  // 按钮交互
  const completeBtn = document.getElementById('completeBtn');
  const stopBtn = document.getElementById('stopBtn');
  if (completeBtn) completeBtn.onclick = function() {
    // 跳转到反馈页
    window.location.href = 'feedback.html';
  };
  if (stopBtn) stopBtn.onclick = function() {
    window.location.href = 'feedback.html';
  };
  
  // 换一批按钮交互
  const refreshBtn = document.getElementById('refreshBtn');
  if (refreshBtn) {
    refreshBtn.onclick = async function() {
      // 显示加载状态
      const loadingIndicator = document.getElementById('loadingIndicator');
      if (loadingIndicator) {
        loadingIndicator.classList.remove('hidden');
        loadingIndicator.style.display = 'flex';
      }
      
      // 隐藏按钮
      btnRow.classList.add('hidden');
      
      try {
        const task = localStorage.getItem('currentTask') || '';
        
        // 调用后端API获取新的建议
        const response = await fetch(window.APP_CONFIG.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            userTask: task,
            refresh: true 
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content || '';
          
          // 解析内容
          const lines = content.split('\n').filter(line => line.trim());
          let firstSteps = [];
          let outline = [];
          
          // 查找前两个建议和完整大纲
          let foundFirstSteps = false;
          let foundOutline = false;
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.toLowerCase().includes('first two actionable suggestions')) {
              foundFirstSteps = true;
              continue;
            }
            
            if (line.toLowerCase().includes('full task outline')) {
              foundFirstSteps = false;
              foundOutline = true;
              continue;
            }
            
            if (foundFirstSteps && line.match(/^\d+\./)) {
              firstSteps.push(line.replace(/^\d+\.\s*/, ''));
              if (firstSteps.length >= 2) foundFirstSteps = false;
            }
            
            if (foundOutline && line.match(/^\d+\./)) {
              outline.push(line.replace(/^\d+\.\s*/, ''));
            }
          }
          
          // 如果没有解析到内容，使用默认格式
          if (firstSteps.length === 0) {
            firstSteps = lines.slice(0, 2);
            outline = lines.slice(2);
          }
          
          showSuggestions(firstSteps, outline, true);
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error('换一批请求失败:', error);
        // 如果后端调用失败，使用前端模拟数据作为fallback
        const task = localStorage.getItem('currentTask') || '';
        const mockData = getMockDataForTask(task);
        showSuggestions(mockData.firstSteps, mockData.outline, true);
      } finally {
        // 隐藏加载状态
        if (loadingIndicator) {
          loadingIndicator.classList.add('hidden');
          loadingIndicator.style.display = 'none';
        }
      }
    };
  }
} 