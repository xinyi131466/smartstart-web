# 测试 DeepSeek API
from openai import OpenAI

# 替换为你的 DeepSeek API Key
API_KEY = "sk-d8a7349cd2414eedb0a99ab9fa4f4fd9"

def test_deepseek_api():
    try:
        # 初始化客户端
        client = OpenAI(
            api_key=API_KEY, 
            base_url="https://api.deepseek.com"
        )
        
        print("正在测试 DeepSeek API...")
        print(f"API Key 长度: {len(API_KEY)}")
        
        # 调用 API
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "You are a helpful assistant. Help break down user tasks into actionable steps. Return the response in this format:\n\nFirst two actionable suggestions:\n1. [First suggestion]\n2. [Second suggestion]\n\nFull task outline:\n1. [Step 1]\n2. [Step 2]\n3. [Step 3]\n..."},
                {"role": "user", "content": "学习英语"}
            ],
            stream=False,
            max_tokens=1000
        )
        
        print("✅ API 调用成功!")
        print("响应内容:")
        print(response.choices[0].message.content)
        
    except Exception as e:
        print(f"❌ API 调用失败: {e}")
        print(f"错误类型: {type(e).__name__}")

if __name__ == "__main__":
    test_deepseek_api() 